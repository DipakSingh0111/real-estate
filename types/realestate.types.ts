export interface LinkItem {
  label?: string;
  name?: string;
  href: string;
  active?: boolean;
}

export interface ImageItem {
  src: string;
  light?: string;
  alt?: string;
}

export interface SectionHeading {
  main: string;
  middle?: string;
  highlight?: string;
}

export interface SocialLink {
  name: string;
  label?: string;
  url: string;
  icon?: string;
}

/* ==========================================================
   1. GLOBAL DATA
   ========================================================== */
export interface GlobalData {
  companyName: string;
  logo: ImageItem;
  tagline?: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  socials: SocialLink[];
}

/* ==========================================================
   2. HEADER / NAVBAR DATA
   ========================================================== */
export interface HeaderData {
  logo: ImageItem;
  menu: LinkItem[];
  cta: LinkItem;
}

/* ==========================================================
   3. HERO BANNER DATA
   ========================================================== */
export interface HeroSlideItem {
  id: number;
  image: string;
  badge?: string;
  heading?: SectionHeading;
  description?: string;
}

export interface HeroSearchFilters {
  propertyTypes: string[];
  locations: string[];
  priceRanges: string[];
  bedBathOptions: string[];
}

export interface HeroBannerData {
  badge?: string;
  heading: SectionHeading;
  description: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
  slides: HeroSlideItem[];
  searchFilters?: HeroSearchFilters;
}

/* ==========================================================
   4. LISTINGS DATA
   ========================================================== */
export interface PropertyListingItem {
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
  nearbyLocations?: {
    category: string;
    items: {
      name: string;
      distance: string;
      type?: string;
    }[];
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

export interface ListingsConfig {
  selectedBadge: string;
  allBadge: string;
  defaultTitle: string;
  cityTitlePrefix: string;
  residencesInPrefix: string;
  emptyMessage: string;
  showAllButtonText: string;
  prevButtonText: string;
  nextButtonText: string;
}

export interface PropertyDetailsConfig {
  fallbackBadge: string;
  defaultDescription: string;
  overviewTitle: string;
  overviewLabels: {
    rooms: string;
    baths: string;
    bed: string;
    size: string;
    yearBuilt: string;
    propertyType: string;
    garage: string;
  };
  detailsTitle: string;
  featuresTitle: string;
  featuresList: string[];
  amenitiesTitle?: string;
  nearbyTitle?: string;
  fallbackImages: string[];
  tourForm: {
    title: string;
    subtitle: string;
    successTitle: string;
    successMessage: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    submitButtonText: string;
  };
}

export interface ListingsData {
  heading: SectionHeading;
  heading2?: SectionHeading;
  badge?: string;
  cta?: LinkItem;
  listingsConfig?: ListingsConfig;
  propertyDetails?: PropertyDetailsConfig;
  list: PropertyListingItem[];
}

/* ==========================================================
   5. CITIES / ENCLAVES DATA
   ========================================================== */
export interface CityEnclaveItem {
  id: string;
  name: string;
  slug: string;
  collection: string;
  image: string;
}

export interface CitiesData {
  badge: string;
  heading: SectionHeading;
  description: string;
  cardBadge?: string;
  cardCollection?: string;
  ctaText?: string;
  cta?: LinkItem;
  list: CityEnclaveItem[];
}

/* ==========================================================
   6. STATS DATA
   ========================================================== */
export interface StatItem {
  id: string;
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  subLabel: string;
}

export interface StatsData {
  list: StatItem[];
}

/* ==========================================================
   7. ABOUT US DATA
   ========================================================== */
export interface AboutCardItem {
  tag: string;
  title: string;
  image: string;
  imageAlt?: string;
  statValue?: string;
}

export interface AboutValueItem {
  number: string;
  title: string;
  description: string;
}

export interface AboutTeamMember {
  name: string;
  role: string;
  image: string;
}

export interface AboutUsData {
  badge: string;
  heading: SectionHeading;
  description: string;
  subDescription?: string;
  primaryCard: AboutCardItem;
  secondaryCard: AboutCardItem;
  strip: {
    label: string;
    title: string;
    cta: LinkItem;
  };
  stats?: {
    value: string;
    label: string;
  }[];
  values?: AboutValueItem[];
  team?: AboutTeamMember[];
}

/* ==========================================================
   8. SERVICES DATA
   ========================================================== */
export interface ServiceCardItem {
  id: string;
  step: string;
  category: string;
  title: string;
  description: string;
  image: string;
  cta?: LinkItem;
}

export interface ServicesData {
  badge: string;
  heading: SectionHeading;
  description: string;
  subDescription?: string;
  image: string;
  ctaTalk: LinkItem;
  ctaExplore: LinkItem;
  list: ServiceCardItem[];
  whyChooseUs?: {
    badge: string;
    heading: SectionHeading;
    list: {
      number: string;
      title: string;
      description: string;
    }[];
  };
}

/* ==========================================================
   9. WHY CHOOSE US DATA
   ========================================================== */
export interface WhyChooseUsItem {
  number: string;
  title: string;
  subtitle?: string;
  image: string;
  tagline: string;
}

export interface WhyChooseUsData {
  heading: SectionHeading;
  list: WhyChooseUsItem[];
}

/* ==========================================================
   10. TESTIMONIALS DATA
   ========================================================== */
export interface TestimonialReviewItem {
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
  heading: SectionHeading;
  description?: string;
  list: TestimonialReviewItem[];
}

/* ==========================================================
   11. FAQ DATA
   ========================================================== */
export interface FaqQuestionItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface FaqData {
  heading: SectionHeading;
  list: FaqQuestionItem[];
}

/* ==========================================================
   12. BLOG & NEWS DATA
   ========================================================== */
export interface BlogPostArticleSection {
  heading: string;
  body: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  image: string;
  tags?: string[];
  keyTakeaways?: string[];
  quote?: {
    text: string;
    cite: string;
  };
  gallery?: string[];
  content?: BlogPostArticleSection[];
}

export interface BlogConfig {
  featuredCoverBadge: string;
  readFullFeatureText: string;
  readStoryText: string;
  readArticleText: string;
  latestArticlesHeading: string;
  secondaryBadge02: string;
  secondaryBadge03: string;
}

export interface BlogDetailsConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  breadcrumbLabel: string;
  executiveSummary: string;
  takeawaysHeading: string;
  categoriesHeading: string;
  recentBlogsHeading: string;
}

export interface BlogNewsData {
  heading?: SectionHeading;
  cta?: LinkItem;
  blogConfig?: BlogConfig;
  blogDetails?: BlogDetailsConfig;
  list: BlogPostItem[];
}

/* ==========================================================
   13. CONTACT PAGE DATA
   ========================================================== */
export interface ContactInfoItem {
  id: string;
  title: string;
  detail: string;
}

export interface ContactPageData {
  badge: string;
  heading: SectionHeading;
  description: string;
  list: ContactInfoItem[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    intentLabel: string;
    intentOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButtonText: string;
    successTitle: string;
    successMessage: string;
  };
}

/* ==========================================================
   14. FOOTER DATA
   ========================================================== */
export interface FooterData {
  description: string;
  socials: SocialLink[];
  navigation: LinkItem[];
  topEnclaves: LinkItem[];
  gallery?: {
    image: string;
    alt: string;
    tag?: string;
    href?: string;
  }[];
  copyright: string;
  credit: string;
}

export interface PageBannersData {
  breadcrumbBackgroundImage: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
}

/* ==========================================================
   SECTION PROPS ARCHITECTURE (Rydora pattern)
   ========================================================== */
export interface SectionProps<T = any> {
  data?: T;
}

export namespace SectionProps {
  export type Global = { data?: GlobalData };
  export type Header = { data?: HeaderData };
  export type PageBanners = { data?: PageBannersData };
  export type Hero = { data?: HeroBannerData };
  export type Listings = { data?: ListingsData; limit?: number };
  export type Cities = { data?: CitiesData };
  export type CityCard = {
    city: CityEnclaveItem;
    index: number;
    total: number;
    badge?: string;
    defaultCollection?: string;
    ctaText?: string;
  };
  export type Stats = { data?: StatsData };
  export type About = { data?: AboutUsData; showStrip?: boolean };
  export type Services = { data?: ServicesData };
  export type WhyChooseUs = { data?: WhyChooseUsData };
  export type Testimonials = { data?: TestimonialsData };
  export type Faq = { data?: FaqData };
  export type Blog = { data?: BlogNewsData; limit?: number };
  export type Contact = { data?: ContactPageData };
  export type Footer = { data?: FooterData };
  export type BlogDetails = {
    initialPost: BlogPostItem;
    allPosts: BlogPostItem[];
    config?: BlogDetailsConfig;
  };
  export type PropertyDetails = {
    property: PropertyListingItem;
    similarProperties?: PropertyListingItem[];
    allProperties?: PropertyListingItem[];
    config?: PropertyDetailsConfig;
  };
  export type PropertyCard = { property: PropertyListingItem };
  export type ListingsGrid = {
    listings: PropertyListingItem[];
    itemsPerPage?: number;
    initialCity?: string;
    availableCities?: { name: string; slug: string }[];
    config?: ListingsConfig;
  };
}

/* ==========================================================
   FULL REAL ESTATE TEMPLATE SCHEMA
   ========================================================== */
export interface TemplateComponentRef {
  key: string;
  component: string;
}

export interface RealEstateSections {
  Global?: { variants?: { [variant: string]: GlobalData } };
  Header?: { variants?: { [variant: string]: HeaderData } };
  PageBanners?: { variants?: { [variant: string]: PageBannersData } };
  HeroBanner?: { variants?: { [variant: string]: HeroBannerData } };
  Listings?: { variants?: { [variant: string]: ListingsData } };
  Cities?: { variants?: { [variant: string]: CitiesData } };
  Stats?: { variants?: { [variant: string]: StatsData } };
  AboutUs?: { variants?: { [variant: string]: AboutUsData } };
  Services?: { variants?: { [variant: string]: ServicesData } };
  WhyChooseUs?: { variants?: { [variant: string]: WhyChooseUsData } };
  Testimonials?: { variants?: { [variant: string]: TestimonialsData } };
  Faq?: { variants?: { [variant: string]: FaqData } };
  BlogNews?: { variants?: { [variant: string]: BlogNewsData } };
  ContactPage?: { variants?: { [variant: string]: ContactPageData } };
  Footer?: { variants?: { [variant: string]: FooterData } };
}

export interface RealEstateTemplateData {
  categories: {
    AuraEstates: {
      templateComponents?: {
        [template: string]: {
          shared: { Header: string; Footer: string };
          pages: { [page: string]: { components: TemplateComponentRef[] } };
        };
      };
      sections: RealEstateSections;
    };
  };
}
