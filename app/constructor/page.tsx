'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown,
  ChevronRight,
  Puzzle,
  Layers,
  LayoutGrid,
  List,
  Check,
  Plus,
  Minus,
  Save,
  Upload,
  Download,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/components/app-layout';
import { ModulesLibrary } from '@/components/modules-library';
import { TelegramPreview } from '@/components/telegram-preview';
import { useAppStore } from '@/lib/store';
import { ALL_MODULES, getModuleCounts, getSubcategories, INDUSTRY_TEMPLATES } from '@/lib/data';
import type { ModuleCategory } from '@/lib/types';

const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  filters: 'Фильтры',
  metrics: 'Метрики',
  charts: 'Графики',
  history: 'История',
  calculators: 'Калькуляторы',
  external: 'Внешние источники',
  telegram: 'Telegram',
  templates: 'Шаблоны',
};

export default function ConstructorPage() {
  const { enabledModules, toggleModule, enableModules, disableModules } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const moduleCounts = useMemo(() => getModuleCounts(), []);
  const totalModules = ALL_MODULES.length;
  
  // Group modules by category for stats
  const categoryStats = useMemo(() => {
    const stats: Record<ModuleCategory, { total: number; enabled: number }> = {} as Record<ModuleCategory, { total: number; enabled: number }>;
    
    (Object.keys(CATEGORY_LABELS) as ModuleCategory[]).forEach(cat => {
      const catModules = ALL_MODULES.filter(m => m.category === cat);
      stats[cat] = {
        total: catModules.length,
        enabled: catModules.filter(m => enabledModules.includes(m.id)).length,
      };
    });
    
    return stats;
  }, [enabledModules]);
  
  // Filter modules based on search and category
  const filteredModules = useMemo(() => {
    let result = ALL_MODULES;
    
    if (selectedCategory) {
      result = result.filter(m => m.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.subcategory.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);
  
  // Group by subcategory
  const groupedModules = useMemo(() => {
    const groups: Record<string, typeof filteredModules> = {};
    
    filteredModules.forEach(module => {
      const key = module.subcategory;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(module);
    });
    
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredModules]);
  
  const handleEnableAll = () => {
    const ids = filteredModules.map(m => m.id);
    enableModules(ids);
  };
  
  const handleDisableAll = () => {
    const ids = filteredModules.map(m => m.id);
    disableModules(ids);
  };
  
  const handleApplyTemplate = (templateId: string) => {
    const template = INDUSTRY_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      // Find matching modules by OKPD2
      const moduleIds = ALL_MODULES
        .filter(m => 
          m.category === 'filters' && 
          template.okpd2?.some(code => m.id.includes(code))
        )
        .map(m => m.id);
      enableModules(moduleIds);
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left sidebar - Modules library */}
        <aside className="w-80 border-r border-border shrink-0 hidden lg:block">
          <ModulesLibrary compact />
        </aside>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="shrink-0 p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Puzzle className="h-6 w-6 text-primary" />
                  Конструктор бота
                </h1>
                <p className="text-sm text-muted-foreground">
                  Выберите модули для вашего Telegram-бота
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {enabledModules.length} / {totalModules.toLocaleString('ru-RU')}
                </Badge>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
                <Button variant="default" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Экспорт конфига
                </Button>
              </div>
            </div>
            
            {/* Search and filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск среди 10,000+ модулей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <Button variant="outline" size="sm" onClick={handleEnableAll}>
                <Plus className="h-4 w-4 mr-1" />
                Включить все
              </Button>
              <Button variant="outline" size="sm" onClick={handleDisableAll}>
                <Minus className="h-4 w-4 mr-1" />
                Выключить все
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Categories sidebar */}
            <div className="w-64 border-r border-border p-4 overflow-auto hidden md:block">
              <h3 className="font-semibold text-sm mb-3">Категории</h3>
              
              <div className="space-y-1">
                <Button
                  variant={selectedCategory === null ? 'secondary' : 'ghost'}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(null)}
                >
                  <span>Все модули</span>
                  <Badge variant="outline">{totalModules}</Badge>
                </Button>
                
                {(Object.keys(CATEGORY_LABELS) as ModuleCategory[]).map(cat => {
                  const stats = categoryStats[cat];
                  return (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{CATEGORY_LABELS[cat]}</span>
                      <div className="flex items-center gap-1">
                        {stats.enabled > 0 && (
                          <Badge variant="default" className="text-xs">
                            {stats.enabled}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {stats.total}
                        </Badge>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              {/* Industry templates */}
              <h3 className="font-semibold text-sm mb-3">Отраслевые шаблоны</h3>
              <div className="space-y-1">
                {['Медицина', 'Строительство', 'IT', 'Продовольствие', 'Услуги'].map(industry => {
                  const templates = INDUSTRY_TEMPLATES.filter(t => t.industry === industry);
                  return (
                    <Button
                      key={industry}
                      variant="ghost"
                      className="w-full justify-between text-sm"
                      onClick={() => templates[0] && handleApplyTemplate(templates[0].id)}
                    >
                      <span>{industry}</span>
                      <Badge variant="outline" className="text-xs">
                        {templates.length}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {/* Modules grid/list */}
            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Найдено: {filteredModules.length.toLocaleString('ru-RU')} модулей
                  </p>
                </div>
                
                {groupedModules.map(([subcategory, modules]) => {
                  const enabledCount = modules.filter(m => enabledModules.includes(m.id)).length;
                  const allEnabled = enabledCount === modules.length;
                  
                  return (
                    <div key={subcategory} className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Layers className="h-4 w-4 text-muted-foreground" />
                          {subcategory}
                          <Badge variant="secondary" className="text-xs">
                            {enabledCount}/{modules.length}
                          </Badge>
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            const ids = modules.map(m => m.id);
                            if (allEnabled) {
                              disableModules(ids);
                            } else {
                              enableModules(ids);
                            }
                          }}
                        >
                          {allEnabled ? (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Скрыть все
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Показать все
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className={viewMode === 'grid' 
                        ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2' 
                        : 'space-y-1'
                      }>
                        {modules.map(module => {
                          const isEnabled = enabledModules.includes(module.id);
                          
                          return (
                            <div
                              key={module.id}
                              className={`
                                flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all
                                ${isEnabled 
                                  ? 'bg-primary/10 border border-primary/30' 
                                  : 'bg-secondary/50 hover:bg-secondary border border-transparent'
                                }
                              `}
                              onClick={() => toggleModule(module.id)}
                            >
                              <div className={`
                                w-5 h-5 rounded flex items-center justify-center shrink-0
                                ${isEnabled ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                              `}>
                                {isEnabled && <Check className="h-3 w-3" />}
                              </div>
                              <span className="text-sm truncate flex-1">{module.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                
                {filteredModules.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-lg font-medium">Модули не найдены</p>
                    <p className="text-sm text-muted-foreground">
                      Попробуйте изменить поисковый запрос или категорию
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        {/* Right sidebar - Preview */}
        <aside className="w-80 border-l border-border shrink-0 hidden xl:block">
          <TelegramPreview />
        </aside>
      </div>
    </AppLayout>
  );
}
