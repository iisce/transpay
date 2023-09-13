"use client";
import { MANAGE_SIDEBAR_LINKS } from "@/lib/consts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="h-full flex-col px-5 min-w-min hidden sm:flex justify-between">
      <div className="flex flex-col gap-3 pt-10">
        {MANAGE_SIDEBAR_LINKS.map((link, h) => (
          <Button
            key={h}
            className="justify-start rounded-xl"
            asChild
            variant={pathname === link.href ? "default" : "ghost"}
          >
            <Link href={link.href} className="shrink-0 whitespace-nowrap">
              <div className="mr-2 h-4 w-4 shrink-0">{link.icon}</div>
              {link.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
