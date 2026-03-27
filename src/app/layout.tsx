import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "caRamel# Official Creator Site",
    description: "caRamel# の公式クリエイターサイト。Vocal Mix / Mixing Engineer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
