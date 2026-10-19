// ===================================
// caRamel# Official Site - Main JavaScript
// Minimal Redesign
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initMixWorks();
    initCopyButtons();
    initScrollAnimations();
    initFixedCTA();
    initSmoothScroll();
});

// ===================================
// Header Scroll Effect
// ===================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

// ===================================
// Mobile Navigation
// ===================================
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    let savedScrollY = 0;

    function openMenu() {
        savedScrollY = window.scrollY;
        menu.classList.add('active');
        toggle.classList.add('active');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
    }

    toggle.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Accessibility: reflect state
    new MutationObserver(() => {
        toggle.setAttribute('aria-expanded', menu.classList.contains('active') ? 'true' : 'false');
    }).observe(menu, { attributes: true, attributeFilter: ['class'] });
}

// ===================================
// Mix Works (新着 / 再生数順)
// データ: assets/data/mix-works.js（scripts/update-mix-works.mjs で自動生成）
// ===================================
const WORKS_SHOW = 6;

function formatViews(n) {
    if (!n) return '';
    if (n >= 1e8) return `${(n / 1e8).toFixed(1).replace(/\.0$/, '')}億回再生`;
    if (n >= 1e4) return `${(n / 1e4).toFixed(1).replace(/\.0$/, '')}万回再生`;
    return `${n.toLocaleString('ja-JP')}回再生`;
}

function formatDate(s) {
    if (!s) return '';
    const [y, m, d] = s.split('-');
    return `${y}.${m}.${d}`;
}

function escapeHtml(s = '') {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function initMixWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;

    const data = window.MIX_WORKS;
    const fallback = document.getElementById('works-fallback');
    const tabs = document.querySelectorAll('[data-works-tab]');

    if (!data || !data.recent || !data.recent.length) {
        // データが無ければプレイリスト埋め込みに切り替え
        grid.hidden = true;
        tabs.forEach(t => (t.parentElement.hidden = true));
        if (fallback) fallback.hidden = false;
        return;
    }

    // 実績数をヒーローに反映（10本単位で切り捨て）
    const totalEl = document.querySelector('[data-works-total]');
    if (totalEl && data.total >= 10) {
        totalEl.innerHTML = `${Math.floor(data.total / 10) * 10}<small>+</small>`;
    }

    const moreBtn = document.createElement('button');
    moreBtn.type = 'button';
    moreBtn.className = 'works-expand';
    moreBtn.textContent = 'さらに表示';
    moreBtn.addEventListener('click', () => {
        grid.classList.add('is-expanded');
        moreBtn.hidden = true;
    });
    grid.after(moreBtn);

    function render(kind) {
        const list = (data[kind] || []).slice(0, WORKS_SHOW);
        grid.innerHTML = list.map((v, i) => {
            const meta = kind === 'popular'
                ? [formatViews(v.views), v.channel].filter(Boolean)
                : [formatDate(v.published), v.channel].filter(Boolean);
            return `
            <article class="work-card">
                <button type="button" class="work-card__media" data-video="${escapeHtml(v.id)}" aria-label="${escapeHtml(v.title)} を再生">
                    <img src="https://i.ytimg.com/vi/${escapeHtml(v.id)}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
                    <span class="work-card__play" aria-hidden="true"></span>
                    ${kind === 'popular' ? `<span class="work-card__rank">#${i + 1}</span>` : ''}
                </button>
                <div class="work-card__body">
                    <h3 class="work-card__title">${escapeHtml(v.title)}</h3>
                    <p class="work-card__meta">${meta.map(escapeHtml).join(' ・ ')}</p>
                </div>
            </article>`;
        }).join('');
        grid.classList.remove('is-expanded');
        moreBtn.hidden = list.length <= 4;
    }

    // クリックでその場で再生（軽量化のため、クリックされるまで iframe を読み込まない）
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.work-card__media');
        if (!btn || btn.querySelector('iframe')) return;
        const id = btn.dataset.video;
        btn.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                const active = t === tab;
                t.classList.toggle('is-active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            render(tab.dataset.worksTab);
        });
    });

    render('recent');
}

// ===================================
// Copy Buttons (依頼テンプレート / クレジット)
// ===================================
function initCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const target = document.querySelector(btn.dataset.copyTarget);
            if (!target) return;
            const text = target.innerText.trim();
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
            }
            const label = btn.textContent;
            btn.textContent = 'コピーしました';
            btn.classList.add('is-copied');
            setTimeout(() => {
                btn.textContent = label;
                btn.classList.remove('is-copied');
            }, 1800);
        });
    });
}

// ===================================
// Scroll Animations (IntersectionObserver)
// ===================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===================================
// Fixed CTA Button
// ===================================
function initFixedCTA() {
    const cta = document.getElementById('fixed-cta');
    const hero = document.getElementById('hero');

    if (!cta || !hero) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cta.classList.remove('visible');
            } else {
                cta.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(hero);
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
