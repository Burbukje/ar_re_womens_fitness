import "../globals.css";
import Navbar from "../components/Navbar";        // Adjusted path
import Footer from "../components/Footer";        // Adjusted path
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../i18n/routing';
import LanguageSwitcher from "../components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Ar-Re Women's Fitness",
  description: "Fitness studio website built with Next.js and Django.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          
          <main>
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}