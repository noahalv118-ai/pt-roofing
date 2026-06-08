import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Roofing and Renovations | Expert Home Improvement in Texas",
  description:
    "PT Roofing and Renovations delivers expert roofing, siding, painting, windows, interior remodeling, foundation repair, and patio covers. Free estimates for Texas homeowners.",
  keywords:
    "roofing Texas, home renovation Austin, siding, exterior painting, foundation repair, patio covers, window replacement",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/ptlogo.jpg" type="image/jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
