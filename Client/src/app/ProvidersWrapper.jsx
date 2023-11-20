"use client"
import { SessionProvider } from "next-auth/react";

export default function ProvidersWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
