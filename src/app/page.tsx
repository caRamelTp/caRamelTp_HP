"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Twitter, Instagram } from 'lucide-react';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section className="hero">
                    <style jsx>{`
            .hero {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 6rem 0;
              position: relative;
              overflow: hidden;
            }
            .hero::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(ellipse at center, rgba(196, 149, 106, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(139, 115, 85, 0.06) 0%, transparent 40%);
              animation: heroGlow 15s ease-in-out infinite;
            }
            @keyframes heroGlow {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -30px) rotate(5deg); }
              66% { transform: translate(-20px, 20px) rotate(-5deg); }
            }
            .hero-content { position: relative; z-index: 1; }
            .hero-title {
              font-size: clamp(2.5rem, 8vw, 5rem);
              font-weight: 700;
              margin-bottom: 1rem;
              background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: fadeInUp 1s ease forwards;
            }
            .hero-subtitle {
              font-size: clamp(1rem, 2.5vw, 1.5rem);
              color: #6B6560;
              margin-bottom: 2rem;
              animation: fadeInUp 1s ease 0.2s forwards;
              opacity: 0;
            }
            .hero-cta {
              display: inline-block;
              padding: 1rem 2rem;
              background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
              color: white;
              font-weight: 500;
              border-radius: 9999px;
              transition: 0.3s ease;
              animation: fadeInUp 1s ease 0.4s forwards;
              opacity: 0;
            }
            .hero-cta:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 20px rgba(45, 41, 38, 0.08);
            }
          `}</style>
                    <div className="hero-content">
                        <h1 className="hero-title">caRamel#</h1>
                        <p className="hero-subtitle">— Creative Universe —</p>
                        <Link href="/gallery" className="hero-cta">Gallery</Link>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="section" id="profile" style={{ background: 'linear-gradient(135deg, rgba(196, 149, 106, 0.06) 0%, rgba(139, 115, 85, 0.04) 100%)' }}>
                    <style jsx>{`
            .section { padding: 6rem 0; }
            .section-title {
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              font-weight: 700;
              text-align: center;
              margin-bottom: 4rem;
              position: relative;
            }
            .section-title::after {
              content: '';
              display: block;
              width: 60px;
              height: 4px;
              background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
              margin: 1rem auto 0;
              border-radius: 9999px;
            }
            .about-content {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              align-items: center;
            }
            @media (max-width: 768px) { .about-content { grid-template-columns: 1fr; } }
            .about-image {
              position: relative;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 8px 40px rgba(45, 41, 38, 0.12);
            }
            .about-text h3 { font-size: 1.5rem; margin-bottom: 1rem; }
            .about-text p { color: #6B6560; margin-bottom: 2rem; line-height: 1.8; }
            .about-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .tag {
              padding: 0.5rem 1rem;
              background: linear-gradient(135deg, rgba(196, 149, 106, 0.15) 0%, rgba(139, 115, 85, 0.1) 100%);
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 500;
            }
          `}</style>
                    <div className="container">
                        <h2 className="section-title">Profile</h2>
                        <div className="about-content fade-in">
                            <div className="about-image">
                                <Image src="/images/profile.jpg" alt="caRamel# プロフィール画像" width={480} height={600} priority />
                            </div>
                            <div className="about-text">
                                <h3>caRamel# (キャラメル)</h3>
                                <p>所属: #TRIFRONTIER<br />歌ってみたなどのMixを嗜んでいます。<br />実績: RAB ESPICE / .LIVE / XP!A / Poltergeist など</p>
                                <div className="about-tags">
                                    <span className="tag">Mixing</span>
                                    <span className="tag">Vocal</span>
                                    <span className="tag">Photo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service CTA Section */}
                <section className="section" style={{ padding: '4rem 0' }}>
                    <div className="container">
                        <div className="fade-in" style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, #C4956A 0%, #8B7355 100%)', borderRadius: '24px', color: 'white' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Mix依頼 受付中</h2>
                            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>あなたの歌を最高のサウンドに仕上げます。<br />歌ってみたからオリジナル曲まで、お気軽にご相談ください。</p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/service" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'white', color: '#2D2926', borderRadius: '50px', fontWeight: 500, transition: '0.3s' }}>
                                    料金・ご依頼方法を見る
                                </Link>
                                <Link href="/gallery" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '50px', fontWeight: 500, transition: '0.3s' }}>
                                    制作実績を見る
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SNS Links Section */}
                <section className="section" id="sns">
                    <style jsx>{`
            .social-links { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; }
            .social-link {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              border-radius: 9999px;
              background: rgba(196, 149, 106, 0.1);
              transition: 0.3s ease;
              color: #2D2926;
            }
            .social-link:hover {
              background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
              color: white;
              transform: translateY(-3px);
            }
          `}</style>
                    <div className="container">
                        <h2 className="section-title">Follow Me</h2>
                        <div className="social-links">
                            <a href="https://youtube.com/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={24} /></a>
                            <a href="https://x.com/caRamelTp_nico" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={24} /></a>
                            <a href="https://instagram.com/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={24} /></a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
