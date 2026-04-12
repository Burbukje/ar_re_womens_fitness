export interface Feature {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface ClassOffering {
  id: number;
  name: string;
  description: string;
  schedule: string;
  order: number;
}

export interface HeroImage {
  studio_name: string;
  hero_title: string;
  hero_subtitle: string;
  home_intro: string;
  about_title: string;
  about_body: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  opening_hours: string;
  features: never[];
  classes: never[];
}

export interface SiteContent {
  studio_name: string;
  hero_title: string;
  hero_image: HeroImage;
  hero_subtitle: string;
  home_intro: string;
  about_title: string;
  about_body: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  opening_hours: string;
  features: Feature[];
  classes: ClassOffering[];
}
