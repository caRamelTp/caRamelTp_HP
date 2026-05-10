"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
    return (
        <>
            <Header />
            <main>
                <div className="page-header">
                    <div className="container"><h1>Contact</h1></div>
                </div>

                <section className="section">
                    <div className="container">
                        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            <p style={{ color: '#6B6560', marginBottom: '2rem' }}>ご依頼やお問い合わせは、メールまたは各SNSのDMよりお気軽にお送りください。</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href="mailto:carameltp.nico@gmail.com" className="cta-btn" style={{ background: 'linear-gradient(135deg, #C4956A 0%, #8B7355 100%)', color: 'white', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500, transition: '0.3s' }}>
                                    <Mail size={24} /> carameltp.nico@gmail.com
                                </a>
                                <a href="https://x.com/caRamelTp_nico" target="_blank" style={{ padding: '1.5rem', background: '#F5F3F0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500, transition: '0.3s' }}>
                                    <MessageSquare size={24} /> Twitter DM (@caRamelTp_nico)
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <a href="https://www.amazon.jp/hz/wishlist/ls/20TH7BMLTU16V?ref_=wl_share" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#A09890', opacity: 0.7, textDecoration: 'none', transition: 'opacity 0.3s' }}>
                        🎁 Amazon ほしい物リスト
                    </a>
                </div>
            </main>
            <Footer />
        </>
    );
}
