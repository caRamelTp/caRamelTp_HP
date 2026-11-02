// ===================================
// Mix Works データ自動生成スクリプト
// -----------------------------------
// YouTube の Mix 実績プレイリストを読み込み、
//   - recent  : 投稿日が新しい順
//   - popular : 再生数が多い順
// を assets/data/mix-works.js（と docs/ 側）に書き出します。
//
// 使い方:
//   node scripts/update-mix-works.mjs             … 通常更新（新しい動画の投稿日だけ取得）
//   node scripts/update-mix-works.mjs --fill-all  … 全動画の投稿日を取得してキャッシュ
//   （環境変数 YT_API_KEY があれば YouTube Data API v3 を使用。
//     無ければ公開ページから取得します）
//
// 取得済みの投稿日は scripts/mix-works-state.json に保存して再利用します。
//
// GitHub Actions（.github/workflows/update-mix-works.yml）で
// 毎日自動実行されます。
// ===================================

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PLAYLIST_ID = 'PLBazqsiSyyIzC6DXES-f0s0yifo024Qll';
const KEEP = 8; // 新着・人気それぞれ保存する本数
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUTS = [
    join(ROOT, 'assets', 'data', 'mix-works.js'),
    join(ROOT, 'docs', 'assets', 'data', 'mix-works.js'),
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

// -----------------------------------
// 方法1: YouTube Data API v3
// -----------------------------------
async function fetchWithApi(key) {
    const ids = [];
    let pageToken = '';
    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${PLAYLIST_ID}&key=${key}${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`playlistItems ${res.status}: ${await res.text()}`);
        const json = await res.json();
        json.items.forEach(it => ids.push(it.contentDetails.videoId));
        pageToken = json.nextPageToken || '';
    } while (pageToken);

    const videos = [];
    for (let i = 0; i < ids.length; i += 50) {
        const chunk = ids.slice(i, i + 50).join(',');
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${chunk}&key=${key}`);
        if (!res.ok) throw new Error(`videos ${res.status}: ${await res.text()}`);
        const json = await res.json();
        json.items.forEach(v => videos.push({
            id: v.id,
            title: v.snippet.title,
            channel: v.snippet.channelTitle,
            views: Number(v.statistics.viewCount || 0),
            published: v.snippet.publishedAt.slice(0, 10),
        }));
    }
    return videos;
}

// -----------------------------------
// 方法2: 公開ページから取得（APIキー不要）
// -----------------------------------
// 英語 (46K views) / 日本語 (4.6万 回視聴) どちらの表記にも対応
const VIEWS_RE = /^\s*[\d.,]+\s*[KMB万億]?\s*(views?|回視聴)?\s*$/i;
const AGE_RE = /ago|前/;

function parseCount(text = '') {
    const m = text.replace(/,/g, '').match(/([\d.]+)\s*([KMB万億])?/i);
    if (!m) return 0;
    const mul = { K: 1e3, M: 1e6, B: 1e9, '万': 1e4, '億': 1e8 }[(m[2] || '').toUpperCase()] || 1;
    return Math.round(parseFloat(m[1]) * mul);
}

function parseAgeDays(text = '') {
    const m = text.match(/(\d+)\s*(second|minute|hour|day|week|month|year|秒|分|時間|日|週間|か月|ヶ月|年)/i);
    if (!m) return Infinity;
    const unit = {
        second: 0, minute: 0, hour: 0, day: 1, week: 7, month: 30, year: 365,
        '秒': 0, '分': 0, '時間': 0, '日': 1, '週間': 7, 'か月': 30, 'ヶ月': 30, '年': 365,
    }[m[2].toLowerCase()];
    return Number(m[1]) * unit;
}

function cleanChannel(name = '') {
    return name
        .replace(/\s*,?\s*and \d+ more$/i, '')
        .replace(/\s*[/／]?\s*、?他\s*\d+\s*チャンネル$/, '')
        .trim();
}

function collectLockups(node, out) {
    if (!node || typeof node !== 'object') return;
    if (node.lockupViewModel) {
        const l = node.lockupViewModel;
        const md = l.metadata?.lockupMetadataViewModel;
        const texts = [];
        (function walk(x) {
            if (!x || typeof x !== 'object') return;
            if (typeof x.content === 'string') texts.push(x.content);
            for (const k in x) walk(x[k]);
        })(md?.metadata);
        const viewsText = texts.find(t => VIEWS_RE.test(t)) || '';
        const ageText = texts.find(t => AGE_RE.test(t)) || '';
        const channel = texts.find(t => t !== viewsText && t !== ageText && !/^\s*[•·]\s*$/.test(t)) || '';
        out.push({
            id: l.contentId,
            title: md?.title?.content || '',
            channel: cleanChannel(channel),
            views: parseCount(viewsText),
            ageDays: parseAgeDays(ageText),
        });
        return;
    }
    if (node.playlistVideoRenderer) {
        const v = node.playlistVideoRenderer;
        const info = (v.videoInfo?.runs || []).map(r => r.text);
        out.push({
            id: v.videoId,
            title: (v.title?.runs || []).map(r => r.text).join('') || v.title?.simpleText || '',
            channel: cleanChannel((v.shortBylineText?.runs || []).map(r => r.text).join('')),
            views: parseCount(info[0]),
            ageDays: parseAgeDays(info.slice(1).join('')),
        });
        return;
    }
    for (const k in node) collectLockups(node[k], out);
}

function findContinuation(node) {
    if (!node || typeof node !== 'object') return null;
    if (node.continuationCommand?.token) return node.continuationCommand.token;
    for (const k in node) {
        const t = findContinuation(node[k]);
        if (t) return t;
    }
    return null;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 投稿日の取得（GitHub Actions 等ではブロックされることがあるため 2 通り試す）
async function fetchPublishDate(id, innertube) {
    // 1) 動画ページ
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' } });
        const html = await res.text();
        const m = html.match(/"publishDate":"([^"]+)"/) || html.match(/"uploadDate":"([^"]+)"/) || html.match(/itemprop="datePublished" content="([^"]+)"/);
        const d = m && m[1].slice(0, 10);
        if (d && DATE_RE.test(d)) return d;
    } catch { /* 次の方法へ */ }

    // 2) innertube player API
    if (innertube?.apiKey) {
        try {
            const res = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${innertube.apiKey}&prettyPrint=false`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
                body: JSON.stringify({
                    context: { client: { clientName: 'WEB', clientVersion: innertube.clientVersion, hl: 'en', gl: 'US' } },
                    videoId: id,
                }),
            });
            const json = await res.json();
            const mf = json?.microformat?.playerMicroformatRenderer;
            const d = (mf?.publishDate || mf?.uploadDate || '').slice(0, 10);
            if (DATE_RE.test(d)) return d;
        } catch { /* 取得できなければ null */ }
    }
    return null;
}

// 取得済みの投稿日キャッシュ（投稿日は変わらないので一度取れたら再利用）
const STATE_FILE = join(ROOT, 'scripts', 'mix-works-state.json');

function loadState() {
    try {
        const json = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
        return { published: json.published || {} };
    } catch {
        return { published: {} };
    }
}

function saveState(state) {
    const sorted = Object.fromEntries(Object.entries(state.published).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(STATE_FILE, `${JSON.stringify({ published: sorted }, null, 2)}\n`, 'utf8');
}

// 投稿日が分からない動画は「◯か月前」表記から推定した日付で並べる
function estimateDate(ageDays) {
    if (!Number.isFinite(ageDays)) return '0000-00-00';
    return new Date(Date.now() - ageDays * 86400000).toISOString().slice(0, 10);
}

async function fetchWithoutApi() {
    const res = await fetch(`https://www.youtube.com/playlist?list=${PLAYLIST_ID}&hl=ja&gl=JP`, {
        headers: { 'User-Agent': UA, 'Accept-Language': 'ja-JP,ja' },
    });
    const html = await res.text();
    const dataMatch = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
    if (!dataMatch) throw new Error('ytInitialData が見つかりません');
    const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
    const clientVersion = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1] || '2.20250101.00.00';

    const videos = [];
    let data = JSON.parse(dataMatch[1]);
    collectLockups(data, videos);
    let token = findContinuation(data);

    let guard = 0;
    while (token && apiKey && guard++ < 30) {
        const r = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}&prettyPrint=false`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': UA },
            body: JSON.stringify({
                context: { client: { clientName: 'WEB', clientVersion, hl: 'ja', gl: 'JP' } },
                continuation: token,
            }),
        });
        if (!r.ok) break;
        data = await r.json();
        const before = videos.length;
        collectLockups(data, videos);
        if (videos.length === before) break;
        token = findContinuation(data);
    }

    // 重複除去
    const seen = new Set();
    const unique = videos.filter(v => v.id && !seen.has(v.id) && seen.add(v.id));
    return { videos: unique, innertube: { apiKey, clientVersion } };
}

// -----------------------------------
// メイン
// -----------------------------------
async function main() {
    const key = process.env.YT_API_KEY;
    const fillAll = process.argv.includes('--fill-all'); // 全動画の投稿日を取得してキャッシュ（初回・手動用）
    const { videos, innertube } = key ? { videos: await fetchWithApi(key), innertube: null } : await fetchWithoutApi();
    if (!videos.length) throw new Error('動画が取得できませんでした');

    // 投稿日: API の値 → キャッシュ → 新規取得 の順で埋める
    const state = loadState();
    for (const v of videos) {
        if (v.published) state.published[v.id] = v.published;
        else if (state.published[v.id]) v.published = state.published[v.id];
    }
    const missing = videos
        .filter(v => !v.published)
        .sort((a, b) => (a.ageDays ?? Infinity) - (b.ageDays ?? Infinity));
    const targets = fillAll ? missing : missing.slice(0, KEEP * 3);
    let fetched = 0;
    for (const v of targets) {
        const d = await fetchPublishDate(v.id, innertube);
        if (d) {
            v.published = d;
            state.published[v.id] = d;
            fetched++;
        }
    }
    console.log(`publish dates: fetched ${fetched}/${targets.length}, cached ${Object.keys(state.published).length}`);

    const strip = ({ id, title, channel, views, published }) => ({ id, title, channel, views, published: published || null });
    const sortKey = v => v.published || estimateDate(v.ageDays);

    const recent = [...videos]
        .sort((a, b) => sortKey(b).localeCompare(sortKey(a)))
        .slice(0, KEEP)
        .map(strip);

    const popular = [...videos].sort((a, b) => b.views - a.views).slice(0, KEEP).map(strip);

    const payload = {
        updatedAt: new Date().toISOString(),
        playlistId: PLAYLIST_ID,
        total: videos.length,
        recent,
        popular,
    };

    const body = `// 自動生成ファイル（scripts/update-mix-works.mjs）。手動編集しないでください。\nwindow.MIX_WORKS = ${JSON.stringify(payload, null, 2)};\n`;
    for (const out of OUTPUTS) {
        if (out.includes(`${join('docs', '')}`) && !existsSync(join(ROOT, 'docs'))) continue;
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, body, 'utf8');
        console.log(`wrote ${out}`);
    }
    saveState(state);
    console.log(`total=${videos.length} recent=${recent.length} popular=${popular.length}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
