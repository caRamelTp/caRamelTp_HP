"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Gallery() {
    const videos = [
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 1" },
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 2" },
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 3" },
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 4" },
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 5" },
        { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Sample 6" },
    ];

    return (
        <>
            <Header />
            <main>
                <div className="page-header">
                    <div className="container">
                        <h1>Gallery / Portfolio</h1>
                    </div>
                </div>

                <section className="section">
                    <style jsx>{`
            .video-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
              gap: 1.5rem;
            }
            .video-item {
              position: relative;
              padding-bottom: 56.25%;
              height: 0;
              overflow: hidden;
              border-radius: 16px;
              box-shadow: 0 2px 8px rgba(45, 41, 38, 0.06);
              background: #000;
              transition: 0.3s ease;
            }
            .video-item:hover {
              transform: translateY(-5px);
              box-shadow: 0 4px 20px rgba(45, 41, 38, 0.08);
            }
            .video-item iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: none;
            }
            .playlist-section {
              margin-top: 3rem;
              padding: 2rem;
              background: linear-gradient(135deg, rgba(196, 149, 106, 0.06) 0%, rgba(139, 115, 85, 0.04) 100%);
              border-radius: 24px;
            }
            .playlist-section h3 { text-align: center; margin-bottom: 1.5rem; }
            .hero-cta {
              display: inline-block;
              padding: 1rem 2rem;
              background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
              color: white;
              font-weight: 500;
              border-radius: 9999px;
              transition: 0.3s ease;
            }
          `}</style>
                    <div className="container">
                        <p style={{ textAlign: 'center', color: '#6B6560', marginBottom: '2rem' }}>
                            これまで担当させていただいた作品の一部をご紹介します。
                        </p>

                        <div className="video-grid">
                            {videos.map((video, index) => (
                                <div key={index} className="video-item fade-in">
                                    <iframe src={video.src} title={video.title} allowFullScreen></iframe>
                                </div>
                            ))}
                        </div>

                        <div className="playlist-section">
                            <h3>YouTube Playlist</h3>
                            <p style={{ textAlign: 'center', color: '#6B6560', marginBottom: '1.5rem' }}>
                                すべての作品はこちらのプレイリストからご覧いただけます。
                            </p>
                            <div className="video-container">
                                <iframe
                                    src="https://www.youtube.com/embed/videoseries?si=QppEeSIWGTkDG2zK&list=PLBazqsiSyyIzC6DXES-f0s0yifo024Qll"
                                    title="YouTube playlist"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>あなたの作品も最高のサウンドに</p>
                            <a href="/service" className="hero-cta">ご依頼について詳しく見る →</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
