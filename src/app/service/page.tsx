"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, ArrowRight } from 'lucide-react';

export default function Service() {
    const plans = [
        { name: "基本プラン", price: "¥8,000", detail: "フルコーラス / 編集〜Mix〜マスタリングまで", sub: "10トラックまで / 納期：約2週間" },
        { name: "ワンコーラスプラン", price: "¥4,000", detail: "ワンコーラス分のMix", sub: "5トラックまで / 納期：約2週間" },
        { name: "Short動画用プラン", price: "¥3,000", detail: "TikTok / YouTube Shorts / Twitter用", sub: "5トラックまで / 納期：約1週間" },
        { name: "マスタリングプラン", price: "¥2,000", detail: "2mixデータのマスタリングのみ", sub: "" },
    ];

    return (
        <>
            <Header />
            <main>
                <style jsx>{`
          .service-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 2px 8px rgba(45, 41, 38, 0.06);
            margin-bottom: 1.5rem;
          }
          .service-card h3 { color: #C4956A; margin-bottom: 1rem; font-size: 1.25rem; }
          .price-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
          .price-table th, .price-table td { padding: 1rem; text-align: left; border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
          .price-table th { background: linear-gradient(135deg, rgba(196, 149, 106, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%); font-weight: 500; }
          .price-highlight { font-size: 1.5rem; font-weight: 700; color: #C4956A; }
          .notice-list { list-style: none; padding: 0; }
          .notice-list li { padding: 0.75rem 0; padding-left: 1.5rem; position: relative; border-bottom: 1px solid rgba(0, 0, 0, 0.05); }
          .notice-list li::before { content: "•"; position: absolute; left: 0; color: #C4956A; font-weight: bold; }
          .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: white;
            color: #2D2926;
            border-radius: 9999px;
            font-weight: 500;
            transition: 0.3s ease;
            box-shadow: 0 2px 8px rgba(45, 41, 38, 0.06);
          }
          .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(45, 41, 38, 0.12); }
        `}</style>

                <div className="page-header">
                    <div className="container"><h1>Service / 依頼について</h1></div>
                </div>

                <section className="section">
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <div className="service-card fade-in">
                            <h3>・料金プラン</h3>
                            <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>・メインプラン</h4>
                            <table className="price-table">
                                <thead>
                                    <tr><th>プラン名</th><th>料金</th><th>内容</th></tr>
                                </thead>
                                <tbody>
                                    {plans.map((plan, i) => (
                                        <tr key={plan.name}>
                                            <td><strong>{plan.name}</strong></td>
                                            <td><span className="price-highlight">{plan.price}</span></td>
                                            <td>{plan.detail}{plan.sub && <><br /><small style={{ color: '#6B6560' }}>{plan.sub}</small></>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ fontSize: '0.9rem', color: '#6B6560', marginTop: '1rem' }}>※ Mixリテイクは何度でも無料です。最高なものを一緒に作りましょう！</p>
                        </div>

                        <div className="service-card fade-in">
                            <h3>・ご依頼方法</h3>
                            <ul className="notice-list">
                                <li><strong>X (Twitter) DM</strong>: <a href="https://x.com/caRamelTp_nico" target="_blank" style={{ color: '#C4956A' }}>@caRamelTp_nico</a></li>
                                <li><strong>メール</strong>: <a href="mailto:carameltp.nico@gmail.com" style={{ color: '#C4956A' }}>carameltp.nico@gmail.com</a></li>
                                <li><strong>Discord</strong>: carameltp_nico</li>
                            </ul>
                        </div>

                        <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, #C4956A 0%, #8B7355 100%)', borderRadius: '24px', color: 'white' }}>
                            <h3>ご依頼・ご相談はお気軽に</h3>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                                <a href="https://x.com/caRamelTp_nico" target="_blank" className="cta-btn">Twitter DM <ArrowRight size={18} /></a>
                                <a href="mailto:carameltp.nico@gmail.com" className="cta-btn"><Mail size={18} /> メールで問い合わせ</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
