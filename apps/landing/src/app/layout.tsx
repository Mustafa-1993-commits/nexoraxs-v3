import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexoraxs.com"),
  title: "NexoraXS — Business Operating System",
  description:
    "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://www.nexoraxs.com",
    title: "NexoraXS — Business Operating System",
    description:
      "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
    images: [
      {
        url: "/branding/Splash.png",
        width: 1200,
        height: 630,
        alt: "NexoraXS — Business Operating System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexoraXS — Business Operating System",
    description:
      "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
    images: ["/branding/Splash.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
