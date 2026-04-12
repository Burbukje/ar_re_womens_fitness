import ContactForm from '@/app/components/ContactForm';
import { getSiteContent } from '@/app/lib';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations('contact');

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

          <div className="contact-layout">
            {/* Studio Information Card */}
            <div className="contact-card">
              <h2>{t('studio_info_title')}</h2>
              <div className="contact-quick-list">
                <div className="contact-quick-item">
                  <strong>{t('email_label')}</strong>
                  <p>{content.contact_email}</p>
                </div>
                <div className="contact-quick-item">
                  <strong>{t('phone_label')}</strong>
                  <p>{content.contact_phone}</p>
                </div>
                <div className="contact-quick-item">
                  <strong>{t('address_label')}</strong>
                  <p>{content.contact_address}</p>
                </div>
                <div className="contact-quick-item">
                  <strong>{t('hours_label')}</strong>
                  <p>{content.opening_hours}</p>
                </div>
              </div>
            </div>

            {/* Send Message Card */}
            <div className="contact-card">
              <h2>{t('send_message_title')}</h2>
              <p>{t('send_message_description')}</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}