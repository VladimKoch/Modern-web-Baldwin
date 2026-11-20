import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Království osudu | Interaktivní historická sága",
  description: "Interaktivní historická sága ze středověkého Jeruzaléma za vlády malomocného krále Balduina IV. Odhalte tajné poselství a rozhodněte o osudu říše.",
  keywords: ["Království osudu", "Balduin IV", "Jeruzalém", "historická sága", "interaktivní hra", "středověk"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Cinzel+Decorative:wght@700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=MedievalSharp&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6] selection:bg-[#D4AF37]/30 selection:text-[#E5C158] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
