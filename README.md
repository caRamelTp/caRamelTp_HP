# caRamel# 公式サイト 利用マニュアル

## ファイル構成

```
caRamel_HP/
├── index.html        ← トップページ
├── about.html        ← プロフィール
├── gallery.html      ← 作品ギャラリー
├── schedule.html     ← スケジュール
├── contact.html      ← お問い合わせ
├── privacy.html      ← プライバシーポリシー
├── terms.html        ← 利用規約
└── assets/
    ├── css/
    │   ├── reset.css   ← CSSリセット
    │   └── style.css   ← メインスタイル
    ├── js/
    │   └── main.js     ← JavaScript
    └── images/
        ├── profile.jpg ← プロフィール画像
        ├── ogp.jpg     ← OGP画像
        └── gallery/    ← ギャラリー画像
```

## 閲覧方法

1. `index.html` をダブルクリックしてブラウザで開く
2. または、フォルダごとWebサーバー（VS Code Live Serverなど）で配信

## 2026年10月リニューアル（MIX依頼中心の構成）

- **公開フォルダは `docs/`**（GitHub Pages）。ルートで編集したら `docs/` にもコピーしてください。
- `index.html` に「実績 → 料金 → 音源の準備 → 依頼の流れ → テンプレート → クレジット/キャンセル → お問い合わせ」を集約。
- `service.html` / `gallery.html` / `contact.html` / `instagram.html` はトップ（または photo.html）へのリダイレクト。

### Mix Works（新着 / 再生数順）の更新
- データ: `assets/data/mix-works.js`（自動生成）
- 手動更新: `node scripts/update-mix-works.mjs`（ルートと `docs/` の両方に書き出します）
- 自動更新: `.github/workflows/update-mix-works.yml` が毎日 03:00 JST に実行
- 任意: リポジトリの Secrets に `YT_API_KEY`（YouTube Data API v3）を登録すると、より正確に取得できます

### 料金・過去のご依頼者様の編集
`index.html` の `<section id="price">` / `<div class="clients">` 内を編集

## コンテンツ編集

### ニュース更新
`index.html` の `<section id="news">` 内を編集

### スケジュール更新
`schedule.html` の `<div class="schedule-list">` 内を編集

### ギャラリー追加
1. 画像を `assets/images/gallery/` に追加
2. `gallery.html` に新しい `<div class="gallery-item">` を追加

### SNSリンク変更
各HTMLファイルの `social-link` 部分のURLを変更

## カスタマイズ

### 色変更
`assets/css/style.css` の `:root` セクションを編集
- `--color-accent-pink`: ピンク系アクセント
- `--color-accent-blue`: ブルー系アクセント

### 画像差し替え
`assets/images/` 内の画像を同名で差し替え

---
© 2026 caRamel#
