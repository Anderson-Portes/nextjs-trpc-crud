import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./_assets/css/globals.css";
import { PropsWithChildren } from "react";
import TRPCProvier from "./_trpc/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App"
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={inter.className}>
          <TRPCProvier>
            {children}
          </TRPCProvier>
        </body>
    </html>
  );
}

export default RootLayout;