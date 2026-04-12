import Link from "next/link";
import { getSiteContent } from "../lib";
import { getTranslations } from "next-intl/server";

const featureIcons = ["01", "02", "03"];
const classTags = ["Strength", "Mobility", "Wellness"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const apiUrl =  "http://127.0.0.1:8000";

  const content = await getSiteContent();

  return (
    <main>
      <section className="container hero">
        <div className="hero-copy">
          <span className="eyebrow">{t("hero_eyebrow")}</span>
          <h1 className="display-title">{t("hero_title")}</h1>
          <p>{t("hero_subtitle")}</p>

          <div className="hero-actions">
            <Link href="/contact" className="button">
              {t("book_consultation")}
            </Link>
            <a href="#classes" className="button-secondary">
              {t("view_classes")}
            </a>
          </div>

          <div className="hero-meta">
            <div className="metric">
              <strong>{t("metric1_title")}</strong>
              <span>{t("metric1_text")}</span>
            </div>
            <div className="metric">
              <strong>{t("metric2_title")}</strong>
              <span>{t("metric2_text")}</span>
            </div>
            <div className="metric">
              <strong>{t("metric3_title")}</strong>
              <span>{t("metric3_text")}</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          {content.hero_image ? (
            <div className="hero-image">
              <img
                src={`${apiUrl}${content.hero_image}`}
                alt="Ar-Re Women's Fitness"
                className="hero-image-img"
              />
            </div>
          ) : (
            <div className="hero-image" aria-hidden="true"></div>
          )}
          <span className="panel-badge">{t("why_choose_title")}</span>
          <div className="panel-list">
            <div className="panel-item">
              <span className="panel-dot" />
              <div>
                <strong>{t("welcoming_title")}</strong>
                <span>{content.home_intro}</span>
              </div>
            </div>
            <div className="panel-item">
              <span className="panel-dot" />
              <div>
                <strong>{t("studio_details_title")}</strong>
                <a
                  href="https://maps.app.goo.gl/6qxeJG9DVfwCpV5d6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address-link"
                >
                  {content.contact_address}
                </a>
              </div>
            </div>
            <div className="panel-item">
              <span className="panel-dot" />
              <div>
                <strong>{t("open_hours_title")}</strong>
                <span>{content.opening_hours}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="divider" />

      <section className="section" id="features">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">{t("features_eyebrow")}</span>
            <h2>{t("features_title")}</h2>
            <p>{t("features_subtitle")}</p>
          </div>

          <div className="grid-3">
            {(content?.features ?? []).map((feature, index) => (
              <article className="card" key={feature.id}>
                <div className="card-icon">{featureIcons[index] ?? "0+"}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section" id="classes">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t("classes_eyebrow")}</span>
            <h2>{t("classes_title")}</h2>
            <p>{t("classes_subtitle")}</p>
          </div>

          <div className="grid-3">
            {(content?.classes ?? []).map((classItem, index) => (
              <article className="class-card" key={classItem.id}>
                <span className="class-tag">
                  {classTags[index] ?? t("studio_class")}
                </span>
                <h3>{classItem.name}</h3>
                <p>{classItem.description}</p>
                <div className="schedule">
                  <strong>{t("schedule_label")}</strong>
                  <p>{classItem.schedule}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-compact">
        <div className="container">
          <div className="info-strip">
            <div>
              <span>{t("studio_details_title")}</span>
              <strong>
                <a
                  href="https://maps.app.goo.gl/6qxeJG9DVfwCpV5d6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address-link"
                >
                  {content.contact_address}
                </a>
              </strong>
            </div>
            <div className="info-item">
              <span>{t("phone_label")}</span>
              <strong>{content.contact_phone}</strong>
            </div>
            <div className="info-item">
              <span>{t("email_label")}</span>
              <strong>{content.contact_email}</strong>
            </div>
            <div className="info-item">
              <span>{t("hours_label")}</span>
              <strong>{content.opening_hours}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about-preview">
        <div className="container featured-cta">
          <div>
            <span className="eyebrow">{t("about_eyebrow")}</span>
            <h2>{t("about_title")}</h2>
            <p>{t("about_body")}</p>
          </div>
          <div>
            <div className="panel-list">
              <div className="panel-item">
                <span className="panel-dot" />
                <div>
                  <strong>{t("guided_by_community")}</strong>
                  <span>{t("guided_by_community_text")}</span>
                </div>
              </div>
              <div className="panel-item">
                <span className="panel-dot" />
                <div>
                  <strong>{t("designed_to_feel_calm")}</strong>
                  <span>{t("designed_to_feel_calm_text")}</span>
                </div>
              </div>
            </div>
            <div className="hero-actions">
              <Link href="/about" className="button">
                {t("learn_more")}
              </Link>
              <Link href="/contact" className="button-secondary">
                {t("contact_us")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
