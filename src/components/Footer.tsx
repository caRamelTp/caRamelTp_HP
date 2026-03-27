import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <style jsx>{`
        .footer {
          padding: 4rem 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02));
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          font-size: 0.875rem;
        }
        .footer-links a {
          color: #6B6560;
          transition: 0.2s ease;
        }
        .footer-links a:hover {
          color: #C4956A;
        }
        .copyright {
          font-size: 0.875rem;
          color: #6B6560;
        }
      `}</style>
            <div className="container footer-content">
                <div className="footer-links">
                    <Link href="/privacy">プライバシーポリシー</Link>
                    <Link href="/terms">利用規約</Link>
                </div>
                <p className="copyright">&copy; 2026 caRamel#. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
