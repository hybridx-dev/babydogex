import type { Metadata, Viewport } from "next";
import LocalFont from "next/font/local";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { BubbleAnimation, Navbar, Revenue } from "../components";
import { Providers } from "./providers";
import { cookieToInitialState } from "wagmi";
import { config } from "../config";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";

const Poet = LocalFont({ src: "./fonts/PoetsenOne-Regular.ttf" });

export const metadata: Metadata = {
  title: "BabyDogeX",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  initialScale: 1.0,
  width: 'device-width',
  colorScheme: 'dark',
  themeColor: 'black'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en" className="dark">
      <body className={Poet.className}>
        <Providers initialState={initialState}>
          <div className="overflow-hidden fixed inset-0">
            <BubbleAnimation/>
          </div>
          <main className="p-4 lg:container min-h-screen w-full lg:w-10/12 md:p-6 flex flex-col">
            <Revenue/>
            <Navbar
              items={
                [
                  { link: '/', title: 'Hybrid NFT' },
                  { link: '/ai', title: 'AI' }
                ]
            }/>
            <div className="mt-2 p-2 flex-grow flex flex-col">
              {children}
            </div>
          </main>
        </Providers>
        <ToastContainer/>
      </body>
    </html>
  );
}
