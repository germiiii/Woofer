import { Inter, Montserrat } from "next/font/google";
import ProvidersWrapper from "./ProvidersWrapper"
import Providers from "../redux/provider"

import './globals.css'


const inter = Inter({ subsets: ["latin"] });
const monstserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={monstserrat.className}>
        <ProvidersWrapper>
          <Providers>
            {children}
          </Providers>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
