import rawData from "@/data/properties.json";
import type { RealEstateTemplateData, RealEstateSections } from "@/types/realestate.types";

const templateData = rawData as unknown as RealEstateTemplateData;

export function getEstateSections(): RealEstateSections {
  return templateData.categories.AuraEstates.sections;
}

export function getEstateSection<K extends keyof RealEstateSections>(sectionKey: K): RealEstateSections[K] {
  return templateData.categories.AuraEstates.sections[sectionKey];
}
