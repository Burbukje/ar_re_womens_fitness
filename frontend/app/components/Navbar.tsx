import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar");

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand-container">
          <Image
            src="/logo.png"
            alt="Ar-Re Women's Fitness Logo"
            width={40}
            height={40}
            className="logo"
          />
          <Link
            href="/"
            className="brand-wrap"
            aria-label="Ar-Re Women's Fitness home"
          >
            <span className="brand">Ar-Re Women&apos;s Fitness</span>
            <span className="brand-subtitle">
              Strength, wellness, and community
            </span>
          </Link>
        </div>

        <nav className="nav-links">
          <Link href="/">{t("home")}</Link>
          <a href="/#features">Programs</a>
          <a href="/#classes">{t("classes")}</a>
          <Link href="/blog">{t("blog")}</Link>
          <Link href="/about">{t("about")}</Link>
          <Link href="/contact" className="nav-cta">
            {t("contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
        {/* <LanguageSwitcher /> */}
      </div>
    </header>
  );
}
