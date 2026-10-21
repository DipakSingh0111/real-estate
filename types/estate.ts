export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
}

export interface CtaButton {
  text: string;
  href: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  price: string;
  location: string;
  city?: string;
  beds: number;
  baths: number;
  features: string[];
  image: string;
  isFavorite?: boolean;
  gallery?: string[];
  tag?: string;
  type?: string;
  status?: string;
  areaSqFt?: number;
  builtYear?: number;
  garages?: number;
  description?: string;
  highlights?: string[];
  amenities?: {
    category: string;
    items: string[];
  }[];
  floorPlan?: {
    bedrooms: string;
    bathrooms: string;
    totalArea: string;
    balcony: string;
    description: string;
  };
  agent?: {
    name: string;
    title: string;
    phone: string;
    email: string;
    avatar: string;
    experience: string;
  };
}

export interface HeroSlide {
  id: number;
  image: string;
  tagline?: string;
  title: string;
  subtitle: string;
}

export interface CounterStat {
  id: string;
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  subLabel: string;
}

export interface CityItem {
  id: string;
  name: string;
  slug?: string;
  image: string;
}

export interface CitySectionData {
  badge: string;
  title: string;
  subtitle: string;
  cities: CityItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  propertyPurchased: string;
  quote: string;
}

export interface TestimonialsData {
  badge: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  developer: string;
  location: string;
  status: string;
  units: string;
  startingPrice: string;
  image: string;
  amenities: string[];
}

export interface LatestProjectsData {
  badge: string;
  title: string;
  subtitle: string;
  projects: ProjectItem[];
}

export interface ContactData {
  badge: string;
  title: string;
  description: string;
  office: {
    label: string;
    address: string;
  };
  phone: {
    label: string;
    number: string;
  };
  email: {
    label: string;
    address: string;
  };
  footerNote: string;
  form: {
    badge: string;
    title: string;
    description: string;
    fields: {
      fullName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    consentText: string;
    submitButtonText: string;
    success: {
      title: string;
      description: string;
      resetButtonText: string;
    };
  };
}

export interface ServiceItem {
  id: string;
  step: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
  imagePosition: "left" | "right";
}

export interface WhyChooseUsCard {
  number: string;
  title: string;
  description: string;
}

export interface ServicesPageData {
  badge: string;
  title: string;
  description: string;
  subDescription: string;
  heroImage: string;
  ctaTalk: {
    text: string;
    href: string;
  };
  ctaExplore: {
    text: string;
    href: string;
  };
  items: ServiceItem[];
  whyChooseUs: {
    badge: string;
    title: string;
    cards: WhyChooseUsCard[];
  };
}

export interface BlogPostArticleSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  image: string;
  gallery?: string[];
  tags?: string[];
  keyTakeaways?: string[];
  quote?: {
    text: string;
    cite: string;
  };
  content?: BlogPostArticleSection[];
}

export interface FooterData {
  description: string;
  socialLinks: {
    name: string;
    label: string;
    url: string;
  }[];
  navigation: {
    name: string;
    href: string;
  }[];
  topEnclaves: {
    name: string;
    href: string;
  }[];
  copyright: string;
  credit: string;
}

export interface EstateData {
  company: {
    name: string;
    logoTagline: string;
    logo?: string;
    logoLight?: string;
    breadcrumbBackgroundImage?: string;
    navLinks: NavLink[];
    ctaButton: {
      text: string;
      href: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    slides: HeroSlide[];
    searchFilters: {
      propertyTypes: string[];
      locations: string[];
      priceRanges: string[];
      bedBathOptions: string[];
    };
  };
  featuredListings: {
    title: string;
    items: PropertyListing[];
  };
  stats: CounterStat[];
  citySection: CitySectionData;
  latestProjects?: LatestProjectsData;
  testimonials: TestimonialsData;
  blogPosts?: BlogPost[];
  contact: ContactData;
  footer: FooterData;
}

