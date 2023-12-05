import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Providers from "../redux/provider";
import { UserProvider } from "./UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>
  );
}
