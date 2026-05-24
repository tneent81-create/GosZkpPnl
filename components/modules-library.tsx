'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown,
  ChevronRight,
  MapPin,
  Package,
  FileText,
  CircleDot,
  Building2,
  Globe,
  Banknote,
  Scale,
  Calendar,
  BarChart3,
  LineChart,
  History,
  Calculator,
  ExternalLink,
  MessageCircle,
  LayoutTemplate,
  Check
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { ALL_MODULES, getSubcategories, filterModules, getModuleCounts } from '@/lib/data';
import { useAppStore } from '@/lib/store';
import type { ModuleCategory } from '@/lib/types';

const CATEGORY_INFO: Record<ModuleCategory, { icon: React.ElementType; label: string; color: string }> = {
  filters: { icon: Filter, label: 'Фильтры', color: 'text-blue-400' },
  metrics: { icon: BarChart3, label: 'Метрики', color: 'text-green-400' },
  charts: { icon: LineChart, label: 'Графики', color: 'text-purple-400' },
  history: { icon: History, label: 'История', color: 'text-yellow-400' },
  calculators: { icon: Calculator, label: 'Калькуляторы', color: 'text-orange-400' },
  external: { icon: ExternalLink, label: 'Внешние', color: 'text-cyan-400' },
  telegram: { icon: MessageCircle, label: 'Telegram', color: 'text-pink-400' },
  templates: { icon: LayoutTemplate, label: 'Шаблоны', color: 'text-emerald-400' },
};

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Package,
  FileText,
  CircleDot,
  Building2,
  Globe,
  Banknote,
  Scale,
  Calendar,
  BarChart3,
  LineChart,
  History,
  Calculator,
  ExternalLink,
  MessageCircle,
  LayoutTemplate,
};

interface ModulesLibraryProps {
  compact?: boolean;
}

export function ModulesLibrary({ compact = false }: ModulesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ModuleCategory | 'all'>('all');
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());
  
  const { enabledModules, toggleModule, enableModules, disableModules } = useAppStore();
  
  const moduleCounts = useMemo(() => getModuleCounts(), []);
  const totalModules = ALL_MODULES.length;
  
  const filteredModules = useMemo(() => {
    return filterModules(searchQuery, activeCategory === 'all' ? undefined : activeCategory);
  }, [searchQuery, activeCategory]);
  
  const groupedModules = useMemo(() => {
    const groups: Record<string, typeof filteredModules> = {};
    filteredModules.forEach(module => {
      const key = `${module.category}:${module.subcategory}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(module);
    });
    return groups;
  }, [filteredModules]);
  
  const toggleSubcategory = (key: string) => {
    setExpandedSubcategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };
  
  const toggleAllInSubcategory = (modules: typeof filteredModules) => {
    const moduleIds = modules.map(m => m.id);
    const allEnabled = moduleIds.every(id => enabledModules.includes(id));
    
    if (allEnabled) {
      disableModules(moduleIds);
    } else {
      enableModules(moduleIds);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-card border-r border-border ${compact ? 'w-80' : 'w-96'}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Библиотека модулей</h2>
          <Badge variant="secondary" className="text-xs">
            {totalModules.toLocaleString('ru-RU')}+
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск модулей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-border"
          />
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="p-2 border-b border-border overflow-x-auto">
        <div className="flex gap-1">
          <Button
            variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveCategory('all')}
            className="text-xs whitespace-nowrap"
          >
            Все
          </Button>
          {(Object.keys(CATEGORY_INFO) as ModuleCategory[]).map(cat => {
            const info = CATEGORY_INFO[cat];
            const Icon = info.icon;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="text-xs whitespace-nowrap gap-1"
              >
                <Icon className={`h-3 w-3 ${info.color}`} />
                {!compact && info.label}
                <span className="text-muted-foreground">
                  ({moduleCounts[cat] || 0})
                </span>
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Modules list */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {Object.entries(groupedModules).map(([key, modules]) => {
            const [category, subcategory] = key.split(':');
            const catInfo = CATEGORY_INFO[category as ModuleCategory];
            const CatIcon = catInfo?.icon || Filter;
            const isExpanded = expandedSubcategories.has(key);
            const enabledCount = modules.filter(m => enabledModules.includes(m.id)).length;
            const allEnabled = enabledCount === modules.length;
            
            return (
              <Collapsible
                key={key}
                open={isExpanded}
                onOpenChange={() => toggleSubcategory(key)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer group">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <CatIcon className={`h-4 w-4 ${catInfo?.color || 'text-muted-foreground'}`} />
                    <span className="flex-1 text-sm font-medium truncate">
                      {subcategory}
                    </span>
                    <Badge 
                      variant={enabledCount > 0 ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {enabledCount}/{modules.length}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAllInSubcategory(modules);
                      }}
                    >
                      {allEnabled ? 'Снять все' : 'Выбрать все'}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 space-y-1">
                    {modules.map(module => {
                      const ModuleIcon = ICON_MAP[module.icon] || Filter;
                      const isEnabled = enabledModules.includes(module.id);
                      
                      return (
                        <div
                          key={module.id}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                            isEnabled 
                              ? 'bg-primary/10 border border-primary/30' 
                              : 'hover:bg-secondary'
                          }`}
                          onClick={() => toggleModule(module.id)}
                        >
                          <Checkbox 
                            checked={isEnabled}
                            className="pointer-events-none"
                          />
                          <ModuleIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="flex-1 text-sm truncate">
                            {module.name}
                          </span>
                          {isEnabled && (
                            <Check className="h-3.5 w-3.5 text-primary" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
          
          {filteredModules.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Модули не найдены</p>
              <p className="text-xs">Попробуйте изменить поисковый запрос</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Footer with enabled count */}
      <div className="p-3 border-t border-border bg-secondary/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Включено модулей:</span>
          <Badge variant="default">{enabledModules.length}</Badge>
        </div>
      </div>
    </div>
  );
}
