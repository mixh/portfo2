import { Space_Grotesk, Outfit, Orbitron } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import NavMenu from "./components/NavMenu";
import ClientOnly from "./components/effects/ClientOnly";
import CustomCursor from "./components/effects/CustomCursor";
import Particles from "./components/effects/Particles";
import { ThemeScript } from "./components/ThemeScript";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Your Name | Portfolio",
  description: "Portfolio website showcasing my work and experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${orbitron.variable} font-sans antialiased pt-20`}
      >
        <ThemeProvider>
          <ClientOnly>
            <CustomCursor />
          </ClientOnly>
          <Particles />
          <NavMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
