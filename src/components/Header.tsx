"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Photo', href: '/photo' },
        { name: 'Service', href: '/service' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          transition: 0.3s ease;
        }
        .header.scrolled {
          box-shadow: 0 2px 8px rgba(45, 41, 38, 0.06);
        }
        .header .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-menu {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          position: relative;
          font-weight: 500;
          padding: 0.5rem 0;
          transition: 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #C4956A 0%, #8B7355 100%);
          transition: 0.2s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
        }
        .nav-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: #2D2926;
        }
        @media (max-width: 768px) {
          .nav-toggle { display: flex; }
          .nav-menu {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            gap: 1rem;
            transform: translateY(${isMenuOpen ? '0' : '-100%'});
            opacity: ${isMenuOpen ? '1' : '0'};
            visibility: ${isMenuOpen ? 'visible' : 'hidden'};
            transition: 0.3s ease;
            box-shadow: 0 4px 20px rgba(45, 41, 38, 0.08);
          }
        }
      `}</style>
            <div className="container">
                <Link href="/" className="logo">caRamel#</Link>
                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span><span></span><span></span>
                </button>
            </div>
        </header>
    );
}
