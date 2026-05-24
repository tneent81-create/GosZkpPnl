// Types for the procurement analytics platform

// Region type
export interface Region {
  code: string;
  name: string;
  shortName: string;
  federalDistrict: 'ЦФО' | 'СЗФО' | 'ЮФО' | 'СКФО' | 'ПФО' | 'УФО' | 'СФО' | 'ДФО';
}

// OKPD2 category
export interface OKPD2Category {
  code: string;
  name: string;
  parentCode?: string;
  level: number;
  children?: OKPD2Category[];
}

// Procurement method
export interface ProcurementMethod {
  id: string;
  name: string;
  shortName: string;
  law: '44-ФЗ' | '223-ФЗ' | '275-ФЗ';
}

// Procurement status
export interface ProcurementStatus {
  id: string;
  name: string;
  color: string;
}

// Customer type
export interface CustomerType {
  id: string;
  name: string;
  category: string;
}

// ETP (Electronic Trading Platform)
export interface ETP {
  id: string;
  name: string;
  url: string;
}

// Price range
export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

// Main procurement item
export interface Procurement {
  id: string;
  registryNumber: string;
  name: string;
  customer: {
    id: string;
    name: string;
    inn: string;
    region: string;
  };
  nmck: number; // Initial maximum contract price
  contractPrice?: number;
  currency: string;
  status: string;
  method: string;
  law: string;
  okpd2: string[];
  ktru?: string[];
  publishDate: string;
  endDate: string;
  auctionDate?: string;
  region: string;
  etp: string;
  applicationSecurity?: number;
  contractSecurity?: number;
  participantsCount?: number;
  url: string;
}

// Filter state
export interface FiltersState {
  regions: string[];
  okpd2: string[];
  methods: string[];
  statuses: string[];
  customerTypes: string[];
  etps: string[];
  priceRange: { min: number; max: number | null };
  dateRange: { start: string | null; end: string | null };
  searchQuery: string;
  laws: string[];
}

// Module types for the constructor
export type ModuleCategory = 
  | 'filters'
  | 'metrics'
  | 'charts'
  | 'history'
  | 'calculators'
  | 'external'
  | 'telegram'
  | 'templates';

export interface Module {
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  subcategory: string;
  icon: string;
  enabled: boolean;
  config?: Record<string, unknown>;
}

// Metric card
export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: string;
}

// Chart configuration
export interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'heatmap' | 'funnel';
  title: string;
  dataKey: string;
  color: string;
}

// Calculator types
export interface MarginCalculation {
  nmck: number;
  proposedPrice: number;
  costPrice: number;
  overheadPercent: number;
  logisticsCost: number;
  vatPercent: number;
  bankGuaranteePercent: number;
  applicationSecurityPercent: number;
  contractSecurityPercent: number;
  // Results
  grossMargin: number;
  grossMarginPercent: number;
  netMargin: number;
  netMarginPercent: number;
  roi: number;
  breakEvenPrice: number;
}

// Telegram bot configuration
export interface TelegramBotConfig {
  token?: string;
  webhookUrl?: string;
  commands: TelegramCommand[];
  buttons: TelegramButton[];
  messageTemplates: TelegramTemplate[];
  filters: FiltersState;
}

export interface TelegramCommand {
  id: string;
  command: string;
  description: string;
  enabled: boolean;
  response?: string;
}

export interface TelegramButton {
  id: string;
  text: string;
  type: 'inline' | 'reply';
  callback?: string;
  url?: string;
  row: number;
  position: number;
}

export interface TelegramTemplate {
  id: string;
  name: string;
  type: 'card' | 'list' | 'stats' | 'digest' | 'notification';
  template: string;
  enabled: boolean;
}

// External data source
export interface ExternalSource {
  id: string;
  name: string;
  category: 'company' | 'court' | 'market' | 'geo' | 'news' | 'rating';
  apiEndpoint?: string;
  enabled: boolean;
  rateLimit?: number;
}

// Industry template
export interface IndustryTemplate {
  id: string;
  name: string;
  industry: string;
  description: string;
  filters: Partial<FiltersState>;
  modules: string[];
}

// Dashboard layout
export interface DashboardWidget {
  id: string;
  type: 'feed' | 'metrics' | 'chart' | 'filters' | 'calculator' | 'history' | 'telegram';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config?: Record<string, unknown>;
}

// API response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Search result
export interface SearchResult {
  procurements: Procurement[];
  total: number;
  aggregations: {
    byRegion: Record<string, number>;
    byStatus: Record<string, number>;
    byMethod: Record<string, number>;
    byPriceRange: Record<string, number>;
  };
}
