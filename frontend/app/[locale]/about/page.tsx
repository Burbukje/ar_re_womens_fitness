import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '../../lib';

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations('about');

  const content = await getSiteContent();

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="page-title">{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </div>

          <div className="about-layout">
            <div className="about-copy">
              <h2>{content.about_title}</h2>
              <p>{t('studio_description')}</p>
              <p>{t('description1')}</p>
              
              <div className="quote-card">
                <strong>{t('mission_title')}</strong>
                <p>{t('mission_text')}</p>
              </div>
            </div>

            <aside className="about-side">
              <h2>{t('approach_title')}</h2>
              <ul className="check-list">
                <li>{t('approach1')}</li>
                <li>{t('approach2')}</li>
                <li>{t('approach3')}</li>
                <li>{t('approach4')}</li>  
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}