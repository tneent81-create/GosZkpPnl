'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  PanelLeftClose, 
  PanelLeft,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppLayout } from '@/components/app-layout';
import { ModulesLibrary } from '@/components/modules-library';
import { ProcurementFeed } from '@/components/procurement-feed';
import { StatsOverview, MiniChart } from '@/components/stats-overview';
import { QuickFilters } from '@/components/quick-filters';
import { TelegramPreview } from '@/components/telegram-preview';
import { useAppStore } from '@/lib/store';
import { generateMockProcurements } from '@/lib/mock';
import type { Procurement } from '@/lib/types';

export default function DashboardPage() {
  const { sidebarOpen, setSidebarOpen, filters, enabledModules } = useAppStore();
  const [procurements, setProcurements] = useState<Procurement[]>([]);
  const [selectedProcurement, setSelectedProcurement] = useState<Procurement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const data = generateMockProcurements(100);
      setProcurements(data);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter procurements based on active filters
  const filteredProcurements = useMemo(() => {
    let result = procurements;
    
    if (filters.regions.length > 0) {
      result = result.filter(p => filters.regions.includes(p.region));
    }
    
    if (filters.statuses.length > 0) {
      result = result.filter(p => filters.statuses.includes(p.status));
    }
    
    if (filters.methods.length > 0) {
      result = result.filter(p => filters.methods.includes(p.method));
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.registryNumber.includes(query) ||
        p.customer.name.toLowerCase().includes(query) ||
        p.customer.inn.includes(query)
      );
    }
    
    if (filters.priceRange.min > 0) {
      result = result.filter(p => p.nmck >= filters.priceRange.min);
    }
    
    if (filters.priceRange.max) {
      result = result.filter(p => p.nmck <= filters.priceRange.max!);
    }
    
    return result;
  }, [procurements, filters]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = generateMockProcurements(100);
      setProcurements(data);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Modules Library Sidebar */}
        {sidebarOpen && (
          <aside className="hidden xl:block shrink-0">
            <ModulesLibrary />
          </aside>
        )}
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="shrink-0 flex items-center justify-between gap-4 p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden xl:flex"
              >
                {sidebarOpen ? (
                  <PanelLeftClose className="h-5 w-5" />
                ) : (
                  <PanelLeft className="h-5 w-5" />
                )}
              </Button>
              
              <div>
                <h2 className="font-semibold">Дашборд закупок</h2>
                <p className="text-xs text-muted-foreground">
                  Найдено: {filteredProcurements.length.toLocaleString('ru-RU')} закупок
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex gap-1">
                <Filter className="h-3 w-3" />
                {enabledModules.length} модулей
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {/* Stats overview */}
              <StatsOverview procurements={filteredProcurements} />
              
              {/* Main grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Filters sidebar */}
                <div className="lg:col-span-3">
                  <QuickFilters />
                </div>
                
                {/* Feed */}
                <div className="lg:col-span-5">
                  <div className="h-[600px] border border-border rounded-lg overflow-hidden bg-card">
                    <div className="p-3 border-b border-border bg-secondary/30">
                      <h3 className="font-medium text-sm">Лента закупок</h3>
                    </div>
                    <div className="h-[calc(100%-48px)]">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      ) : (
                        <ProcurementFeed
                          procurements={filteredProcurements}
                          onSelect={setSelectedProcurement}
                          selectedId={selectedProcurement?.id}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right sidebar with charts and telegram */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="h-[290px]">
                    <MiniChart procurements={filteredProcurements} type="distribution" />
                  </div>
                  <div className="h-[290px]">
                    <TelegramPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
