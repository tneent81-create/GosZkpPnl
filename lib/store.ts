import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  FiltersState, 
  Module, 
  Procurement, 
  DashboardWidget,
  TelegramBotConfig 
} from './types';

interface AppState {
  // Filters
  filters: FiltersState;
  setFilters: (filters: Partial<FiltersState>) => void;
  resetFilters: () => void;

  // Procurements
  procurements: Procurement[];
  setProcurements: (procurements: Procurement[]) => void;
  selectedProcurement: Procurement | null;
  setSelectedProcurement: (procurement: Procurement | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Modules (10,000+ available)
  enabledModules: string[];
  toggleModule: (moduleId: string) => void;
  enableModules: (moduleIds: string[]) => void;
  disableModules: (moduleIds: string[]) => void;

  // Dashboard widgets
  widgets: DashboardWidget[];
  addWidget: (widget: DashboardWidget) => void;
  removeWidget: (widgetId: string) => void;
  updateWidget: (widgetId: string, updates: Partial<DashboardWidget>) => void;

  // Telegram bot
  telegramConfig: TelegramBotConfig;
  setTelegramConfig: (config: Partial<TelegramBotConfig>) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modulesSearchQuery: string;
  setModulesSearchQuery: (query: string) => void;
}

const defaultFilters: FiltersState = {
  regions: [],
  okpd2: [],
  methods: [],
  statuses: [],
  customerTypes: [],
  etps: [],
  priceRange: { min: 0, max: null },
  dateRange: { start: null, end: null },
  searchQuery: '',
  laws: [],
};

const defaultTelegramConfig: TelegramBotConfig = {
  commands: [
    { id: 'start', command: '/start', description: 'Начало работы', enabled: true },
    { id: 'help', command: '/help', description: 'Справка', enabled: true },
    { id: 'menu', command: '/menu', description: 'Главное меню', enabled: true },
    { id: 'search', command: '/search', description: 'Поиск закупок', enabled: true },
    { id: 'filters', command: '/filters', description: 'Мои фильтры', enabled: true },
    { id: 'favorites', command: '/favorites', description: 'Избранное', enabled: true },
    { id: 'stats', command: '/stats', description: 'Статистика', enabled: true },
    { id: 'settings', command: '/settings', description: 'Настройки', enabled: true },
  ],
  buttons: [],
  messageTemplates: [],
  filters: defaultFilters,
};

const defaultWidgets: DashboardWidget[] = [
  { id: 'stats-overview', type: 'metrics', title: 'Обзор', position: { x: 0, y: 0, w: 12, h: 2 } },
  { id: 'quick-filters', type: 'filters', title: 'Быстрые фильтры', position: { x: 0, y: 2, w: 3, h: 6 } },
  { id: 'procurements-feed', type: 'feed', title: 'Лента закупок', position: { x: 3, y: 2, w: 6, h: 6 } },
  { id: 'dynamics-chart', type: 'chart', title: 'Динамика', position: { x: 9, y: 2, w: 3, h: 3 } },
  { id: 'telegram-preview', type: 'telegram', title: 'Telegram бот', position: { x: 9, y: 5, w: 3, h: 3 } },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Procurements
      procurements: [],
      setProcurements: (procurements) => set({ procurements }),
      selectedProcurement: null,
      setSelectedProcurement: (procurement) => set({ selectedProcurement: procurement }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      // Modules
      enabledModules: [
        // Default enabled modules
        'filter-regions',
        'filter-price',
        'filter-status',
        'filter-date',
        'metric-total-count',
        'metric-total-sum',
        'metric-avg-economy',
        'chart-dynamics',
        'telegram-basic',
      ],
      toggleModule: (moduleId) =>
        set((state) => ({
          enabledModules: state.enabledModules.includes(moduleId)
            ? state.enabledModules.filter((id) => id !== moduleId)
            : [...state.enabledModules, moduleId],
        })),
      enableModules: (moduleIds) =>
        set((state) => ({
          enabledModules: [...new Set([...state.enabledModules, ...moduleIds])],
        })),
      disableModules: (moduleIds) =>
        set((state) => ({
          enabledModules: state.enabledModules.filter((id) => !moduleIds.includes(id)),
        })),

      // Dashboard
      widgets: defaultWidgets,
      addWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeWidget: (widgetId) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== widgetId),
        })),
      updateWidget: (widgetId, updates) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === widgetId ? { ...w, ...updates } : w
          ),
        })),

      // Telegram
      telegramConfig: defaultTelegramConfig,
      setTelegramConfig: (config) =>
        set((state) => ({
          telegramConfig: { ...state.telegramConfig, ...config },
        })),

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),
      modulesSearchQuery: '',
      setModulesSearchQuery: (query) => set({ modulesSearchQuery: query }),
    }),
    {
      name: 'zakupki-bot-storage',
      partialize: (state) => ({
        filters: state.filters,
        enabledModules: state.enabledModules,
        widgets: state.widgets,
        telegramConfig: state.telegramConfig,
      }),
    }
  )
);
