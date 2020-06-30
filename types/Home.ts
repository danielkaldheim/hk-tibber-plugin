export interface Address {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
}
export interface ContactInfo {
  email: string; // The email of the corresponding entity
  mobile: string; // The mobile phone no of the corresponding entity
}
export enum HeatingSource {
  AIR2AIR_HEATPUMP,
  ELECTRICITY,
  GROUND,
  DISTRICT_HEATING,
  ELECTRIC_BOILER,
  AIR2WATER_HEATPUMP,
  OTHER,
}
export enum HomeAvatar {
  APARTMENT,
  ROWHOUSE,
  FLOORHOUSE1,
  FLOORHOUSE2,
  FLOORHOUSE3,
  COTTAGE,
  CASTLE,
}
export enum EnergyResolution {
  HOURLY,
  DAILY,
  WEEKLY,
  MONTHLY,
  ANNUAL,
}
export interface PriceInfo {}
export interface HomeConsumptionPageInfo {
  endCursor: string; // The global ID of the last element in the list
  hasNextPage: boolean; // True if further pages are available
  hasPreviousPage: boolean; // True if previous pages are available
  startCursor: string; // The global ID of the first element in the list
  count: number; // The number of elements in the list
  currency: string; // The currency of the page
  totalCost: number; // Page total cost
  totalConsumption: number; // Total consumption for page
  filtered?: number; // Number of entries that have been filtered from result set due to empty nodes
}
export interface Consumption {
  from?: string;
  to?: string;
  unitPrice: number;
  unitPriceVAT: number;
  consumption: number; // kWh consumed
  consumptionUnit: string;
  cost: number;
  currency: string; // The cost currency
}
export interface HomeConsumptionEdge {
  cursor?: string;
  node?: Consumption;
}
export interface HomeConsumptionConnection {
  pageInfo?: HomeConsumptionPageInfo;
  nodes: Consumption[];
  edges: HomeConsumptionEdge[];
}
export interface HomeFeatures {
  realTimeConsumptionEnabled: boolean;
}
export interface HomeProductionPageInfo {}
export interface Production {}
export interface HomeProductionEdge {}
export interface HomeProductionConnection {
  pageInfo?: HomeProductionPageInfo;
  nodes: Production[];
  edges: HomeProductionEdge[];
}
export enum HomeType {
  APARTMENT,
  ROWHOUSE,
  HOUSE,
  COTTAGE,
}
export interface LegalEntity {
  id?: string;
  firstName: string; // First/Christian name of the entity
  isCompany: boolean; // 'true' if the entity is a company
  name?: string; // Full name of the entity
  middleName: string; // Middle name of the entity
  lastName: string; // Last name of the entity
  organizationNo: string; // Organization number - only populated if entity is a company (isCompany=true)
  language: string; // The primary language of the entity
  contactInfo: ContactInfo; // Contact information of the entity
  address: Address; // Address information for the entity
}
export interface MeteringPointData {
  consumptionEan: string; // The metering point ID of the home
  gridCompany: string; // The grid provider of the home
  gridAreaCode: string; // The grid area the home/metering point belongs to
  priceAreaCode: string; // The price area the home/metering point belongs to
  productionEan: string; // The metering point ID of the production
  energyTaxType: string; // The eltax type of the home (only relevant for Swedish homes)
  vatType: string; // The VAT type of the home (only relevant for Norwegian homes)
  estimatedAnnualConsumption: number; // The estimated annual consumption as reported by grid company
}
export interface Subscription {
  id?: string;
  subscriber?: LegalEntity; // The owner of the subscription
  validFrom: string; // The time the subscription started
  validTo: string; // The time the subscription ended
  status: string; // The current status of the subscription
  priceInfo: PriceInfo; // Price information related to the subscription
}

export interface Home {
  id?: string;
  timeZone?: string; // The time zone the home resides in
  appNickname: string; // The nickname given to the home by the user
  appAvatar?: HomeAvatar; // The chosen avatar for the home
  size: number; // The size of the home in square meters
  type?: HomeType; // The type of home.
  numberOfResidents: number; // The number of people living in the home
  primaryHeatingSource: HeatingSource; // The primary form of heating in the household
  hasVentilationSystem: boolean; // Whether the home has a ventilation system
  mainFuseSize: number; // The main fuse size
  address: Address;
  owner: LegalEntity; // The registered owner of the house
  meteringPointData: MeteringPointData;
  currentSubscription: Subscription; // The current/latest subscription related to the home
  subscriptions?: Subscription[]; // All historic subscriptions related to the home
  consumption: HomeConsumptionConnection; // Consumption connection
  production: HomeProductionConnection;
  features: HomeFeatures;
}
