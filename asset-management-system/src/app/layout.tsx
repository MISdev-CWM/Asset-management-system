import type { Metadata } from "next";
import "@/styles.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AssetTrack",
  description: "Asset management: register assets, handovers and returns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
