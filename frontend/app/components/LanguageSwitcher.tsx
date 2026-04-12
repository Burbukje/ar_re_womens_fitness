"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../i18n/routing";

const flags = {
  en: "🇬🇧",
  sq: "🇦🇱",
  mk: "🇲🇰",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-5 text-3xl">
      {(["en", "sq", "mk"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => changeLanguage(loc)}
          style={{
            objectFit: "contain",
            background: "transparent",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          className={`transition-all duration-200 hover:scale-125 active:scale-110 p-1 rounded-full ${
            locale === loc
              ? "scale-125 ring-2 ring-rose-500 ring-offset-2"
              : "hover:opacity-80"
          }`}
          title={
            loc === "en" ? "English" : loc === "sq" ? "Shqip" : "Македонски"
          }
        >
          {flags[loc]}
        </button>
      ))}
    </div>
  );
}
