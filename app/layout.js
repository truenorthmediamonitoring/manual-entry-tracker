import "./globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "./ui/SessionProvider";


export const metadata = {
  title: "TrueNorth Monitoring Tracker",
  description: "Progress and accountability tracker for all end goals.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()

  return (
    <html lang="en" className=" bg-zinc-50">
      <body
        className={`antialiased`}
      >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        {/* <Script src="https://kit.fontawesome.com/dcd356c426.js" /> */}
      </body>
    </html>
  );
}
