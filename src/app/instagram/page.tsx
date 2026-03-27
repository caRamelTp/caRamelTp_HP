"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from 'lucide-react';

export default function InstagramPage() {
    return (
        <>
            <Header />
            <main>
                <div className="page-header">
                    <div className="container"><h1>Instagram</h1></div>
                </div>

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
            </main>
            <Footer />
        </>
    );
}
