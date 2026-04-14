import { SiteContent } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

const fallbackData: SiteContent = {
  studio_name: "Ar-Re Women's Fitness",
  hero_title: "Strong Women. Supportive Space. Real Results.",
  hero_subtitle:
    "A welcoming fitness studio designed for women who want to move confidently, feel healthier, and build lasting strength.",
  home_intro:
    "At Ar-Re Women's Fitness, we focus on strength, mobility, community, and sustainable routines that fit real life.",
  about_title: "About Ar-Re",
  about_body:
    "Ar-Re Women's Fitness is a modern fitness studio built for women of all experience levels. We believe movement should feel empowering, accessible, and personal.",
  contact_email: "ar.re.fitness@gmail.com",
  contact_phone: "+389 71 742 874",
  contact_address: "Rr. Kiro Kistoski DRNC nr. 39, Tetovo",
  opening_hours: "Mon-Fri: 10:00 - 22:00 | Sat: 12:00 - 18:00",
  features: [],
  classes: [],
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const response = await fetch(`${API_BASE_URL}/site-content/`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return fallbackData;
    }
    return response.json();
  } catch {
    return fallbackData;
  }
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to send message");
  }

  return response.json();
}
