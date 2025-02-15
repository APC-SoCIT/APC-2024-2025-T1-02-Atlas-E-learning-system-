"use client";

import Link from "next/link";
import Image from "next/image";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";

interface AppLogoHeaderProps {
  className?: string;
}

export default function AppLogoHeader({ className }: AppLogoHeaderProps) {
  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const width = isMobile ? 24 : 32;
  const height = isMobile ? 24 : 32;

  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-3">
        <Image
          src="/logo/army_logo_48x48.png"
          alt="Logo of Philippine Army"
          width={width}
          height={height}
        />
        <span className="font-bold text-xl md:text-2xl">ATLAS</span>
      </div>
    </Link>
  );
}
