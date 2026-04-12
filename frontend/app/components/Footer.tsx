import { useTranslations } from "next-intl";

export default function Footer() {

  const t = useTranslations("footer");
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p><strong>Ar-Re Women&apos;s Fitness</strong></p>
          <p>{t("tagline")}</p>
        </div>
        <div className="social-links">
          <a href="/contact" className="social-link">{t("book_consultation")}</a>
          <a href="/#classes" className="social-link">{t("explore_classes")}</a>
        </div>
      </div>
    </footer>
  );
}
