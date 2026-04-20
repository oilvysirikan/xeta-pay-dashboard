"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState("en");

  const toggleLocale = () => {
    setLocale(locale === "en" ? "th" : "en");
  };

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4" />
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLocale}
      >
        {locale === "en" ? "🇹🇭 ไทย" : "🇺🇸 English"}
      </Button>
    </div>
  );
}
