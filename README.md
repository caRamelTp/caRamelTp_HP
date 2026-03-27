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
