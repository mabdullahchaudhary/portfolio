import Footer from "@/components/shared/Footer";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";

export const metadata = {
  metadataBase: new URL("http://abdullahchaudhary.me"),
  title: {
    default: "Abdullah Chaudhary | Full Stack Developer",
    template: "%s | Abdullah Chaudhary",
  },
  description:
    "Professional portfolio of Abdullah Chaudhary, a Full Stack Developer & Entrepreneur. Showcasing expertise in system design, robust backend architectures, modern frontend engineering, and advanced UI/UX.",
  keywords: [
    "Abdullah Chaudhary",
    "Full Stack Developer",
    "System Design",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js",
    "React",
    "UI/UX",
    "Web Development",
    "Pakistan",
  ],
  authors: [{ name: "Abdullah Chaudhary", url: "http://abdullahchaudhary.me" }],
  creator: "Abdullah Chaudhary",
  publisher: "Abdullah Chaudhary",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Abdullah Chaudhary | Full Stack Developer",
    description:
      "Professional portfolio showcasing system design, frontend engineering, and advanced UI/UX.",
    url: "http://abdullahchaudhary.me",
    siteName: "Abdullah Chaudhary Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/image.png", // will resolve to basePath + /assets/image.png
        width: 1200,
        height: 630,
        alt: "Abdullah Chaudhary - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Chaudhary | Full Stack Developer",
    description:
      "Professional portfolio showcasing system design, frontend engineering, and advanced UI/UX.",
    creator: "@mabdullah", // Twitter handle if available
    images: ["/assets/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ scrollBehavior: "auto" }}>
      <body className="antialiased relative min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer/>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
