import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "JobLink360 - AI-Powered Job Matching for East Africa",
  description: "Connect with opportunities through intelligent job matching. JobLink360 uses AI to match skilled workers with employers across Kenya, Uganda, and Tanzania.",
  keywords: ["jobs", "employment", "AI", "East Africa", "Kenya", "Uganda", "Tanzania", "career"],
  openGraph: {
    title: "JobLink360 - AI-Powered Job Matching",
    description: "Find your next opportunity with AI-powered job matching for East Africa.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobLink360 - AI-Powered Job Matching",
    description: "Find your next opportunity with AI-powered job matching for East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
