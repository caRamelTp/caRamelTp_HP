"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram, Camera } from 'lucide-react';

export default function PhotoPage() {
    return (
        <>
            <Header />
            <main>
                <style jsx>{`
                    .photo-card {
                        background: white;
                        border-radius: 16px;
                        padding: 2rem;
                        box-shadow: 0 2px 8px rgba(45, 41, 38, 0.06);
                        margin-bottom: 1.5rem;
                    }
                    .photo-card h3 {
                        color: #C4956A;
                        margin-bottom: 1rem;
                        font-size: 1.25rem;
                    }
                    .price-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 1rem 0;
                    }
                    .price-table th, .price-table td {
                        padding: 1rem;
                        text-align: left;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    }
                    .price-table th {
                        background: linear-gradient(135deg, rgba(196, 149, 106, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%);
                        font-weight: 500;
                    }
                    .price-highlight {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #C4956A;
                    }
                    .equipment-list {
                        list-style: none;
                        padding: 0;
                    }
                    .equipment-list li {
                        padding: 0.5rem 0;
                        padding-left: 1.5rem;
                        position: relative;
                        color: #6B6560;
                    }
                    .equipment-list li::before {
                        content: "•";
                        position: absolute;
                        left: 0;
                        color: #C4956A;
                        font-weight: bold;
                    }
                    .equipment-category {
                        font-weight: 600;
                        color: #2D2926;
                        margin-top: 1rem;
                        margin-bottom: 0.25rem;
                    }
                    .notice-list {
                        list-style: none;
                        padding: 0;
                    }
                    .notice-list li {
                        padding: 0.75rem 0;
                        padding-left: 1.5rem;
                        position: relative;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .notice-list li::before {
                        content: "•";
                        position: absolute;
                        left: 0;
                        color: #C4956A;
                        font-weight: bold;
                    }
                    @media (max-width: 768px) {
                        .photo-card { padding: 1.5rem; }
                        .price-table { font-size: 0.85rem; }
                        .price-table th, .price-table td { padding: 0.75rem 0.5rem; }
                        .price-highlight { font-size: 1.15rem; }
                    }
                `}</style>

                <div className="page-header">
                    <div className="container"><h1>Photo</h1></div>
                </div>

                {/* Instagram セクション */}
                <section className="section">
                    <div className="container">
                        <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'center' }} className="fade-in">
                            <p style={{ color: '#6B6560', marginBottom: '2rem' }}>写真作品を中心に投稿しています。</p>

                            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 8px rgba(45, 41, 38, 0.06)' }}>
                                <Instagram size={64} style={{ marginBottom: '1rem', color: '#C4956A' }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>@carameltp_cam</h3>
                                <p style={{ color: '#6B6560', fontSize: '0.9rem' }}>Photo works by caRamel#</p>

                                <a
                                    href="https://www.instagram.com/carameltp_cam/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '1rem 2rem',
                                        background: 'linear-gradient(135deg, #C4956A 0%, #8B7355 100%)',
                                        color: 'white',
                                        borderRadius: '9999px',
                                        fontWeight: '500',
                                        fontSize: '1.1rem',
                                        transition: '0.3s ease',
                                        marginTop: '2rem'
                                    }}
                                >
                                    Instagramで見る
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 撮影依頼セクション */}
                <section className="section" style={{ background: 'linear-gradient(135deg, rgba(196, 149, 106, 0.06) 0%, rgba(139, 115, 85, 0.04) 100%)' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <h2 className="section-title">撮影依頼について</h2>

                        <div className="photo-card fade-in">
                            <h3>・撮影について</h3>
                            <p style={{ color: '#6B6560', lineHeight: '1.8' }}>
                                主に関東を中心にライブ撮影、ポートレート撮影等を中心に<br />
                                撮影をさせて頂いています。
                            </p>
                        </div>

                        <div className="photo-card fade-in">
                            <h3>・使用機材</h3>
                            <p className="equipment-category">ボディ：</p>
                            <ul className="equipment-list">
                                <li>Nikon Z5II</li>
                                <li>Nikon D800</li>
                            </ul>
                            <p className="equipment-category">レンズ：</p>
                            <ul className="equipment-list">
                                <li>NIKKOR Z 24-70mm f/2.8 S II</li>
                                <li>NIKKOR Z 70-200mm f/2.8 VR S</li>
                                <li>NIKKOR Z 24-50mm f/4-6.3</li>
                                <li>FUJINON 55mm f/2.2</li>
                                <li>Super-Takumar 55mm f/1.8</li>
                                <li>NIKKOR 50mm f/1.4</li>
                                <li>TAMRON 28-75mm f/2.8 MACRO</li>
                                <li>AF NIKKOR 35-135mm f/3.5-4.5</li>
                            </ul>
                        </div>

                        <div className="photo-card fade-in">
                            <h3>・料金プラン</h3>

                            <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>【ライブ撮影(写真・個人)】</h4>
                            <table className="price-table">
                                <thead><tr><th>内容</th><th>料金</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td>ライブ撮影（写真・個人）</td>
                                        <td><span className="price-highlight">¥7,000</span> ＋交通費</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul className="notice-list">
                                <li>個人依頼される場合は主催者様に許可をいただいてください。</li>
                                <li>交通費は最寄り駅よりライブハウスの最寄り駅までの金額となります。</li>
                            </ul>

                            <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>【ライブ撮影(写真・全体)】</h4>
                            <table className="price-table">
                                <thead><tr><th>内容</th><th>料金</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td>片部</td>
                                        <td><span className="price-highlight">¥15,000</span>（交通費含む※関東圏のみ）</td>
                                    </tr>
                                    <tr>
                                        <td>両部</td>
                                        <td><span className="price-highlight">¥20,000</span>（交通費含む※関東圏のみ）</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul className="notice-list">
                                <li>関東以外の遠征撮影も承っております。上記料金に交通費分上乗せさせていただきます。</li>
                                <li>目安：東京都内 30,000円（交通費含む）</li>
                            </ul>

                            <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>【動画撮影】</h4>
                            <table className="price-table">
                                <thead><tr><th>内容</th><th>料金</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td>映像（定点）1曲あたり</td>
                                        <td><span className="price-highlight">¥500</span>（一眼レフ使用）</td>
                                    </tr>
                                    <tr>
                                        <td>全体の動画のみ（片部）</td>
                                        <td><span className="price-highlight">¥15,000</span>（交通費含む※関西圏のみ）</td>
                                    </tr>
                                    <tr>
                                        <td>全体の動画のみ（両部）</td>
                                        <td><span className="price-highlight">¥20,000</span>（交通費含む※関西圏のみ）</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul className="notice-list">
                                <li>機材の関係で写真または動画どちらかのご依頼しか承れませんのでご了承ください。</li>
                            </ul>
                        </div>

                        <div className="photo-card fade-in">
                            <h3>・キャンセル料について</h3>
                            <table className="price-table">
                                <thead><tr><th>期間</th><th>キャンセル料</th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td>2週間以内</td>
                                        <td><strong>50%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>1週間以内</td>
                                        <td><strong>100%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
