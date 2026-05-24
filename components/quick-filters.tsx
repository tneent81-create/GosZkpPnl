'use client';

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Banknote, 
  Calendar,
  X,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppStore } from '@/lib/store';
import { REGIONS, PROCUREMENT_STATUSES, PROCUREMENT_METHODS, TIME_FILTERS } from '@/lib/data';
import { formatCurrency } from '@/lib/mock';

export function QuickFilters() {
  const { filters, setFilters, resetFilters } = useAppStore();
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  const activeFiltersCount = 
    filters.regions.length + 
    filters.statuses.length + 
    filters.methods.length +
    (filters.searchQuery ? 1 : 0) +
    (filters.priceRange.max ? 1 : 0);

  const handleRegionToggle = (regionCode: string) => {
    const newRegions = filters.regions.includes(regionCode)
      ? filters.regions.filter(r => r !== regionCode)
      : [...filters.regions, regionCode];
    setFilters({ regions: newRegions });
  };

  const handleStatusToggle = (statusId: string) => {
    const newStatuses = filters.statuses.includes(statusId)
      ? filters.statuses.filter(s => s !== statusId)
      : [...filters.statuses, statusId];
    setFilters({ statuses: newStatuses });
  };

  const handleMethodToggle = (methodId: string) => {
    const newMethods = filters.methods.includes(methodId)
      ? filters.methods.filter(m => m !== methodId)
      : [...filters.methods, methodId];
    setFilters({ methods: newMethods });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    const min = value[0] * 10000000;
    const max = value[1] === 100 ? null : value[1] * 10000000;
    setFilters({ priceRange: { min, max } });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Быстрые фильтры</CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-7 text-xs gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Сбросить ({activeFiltersCount})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Поиск</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Название, номер, ИНН..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ searchQuery: e.target.value })}
              className="pl-9 h-9 text-sm"
            />
            {filters.searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setFilters({ searchQuery: '' })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Регионы
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-9 text-sm">
                {filters.regions.length > 0 
                  ? `Выбрано: ${filters.regions.length}` 
                  : 'Все регионы'}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <ScrollArea className="h-64">
                <div className="p-2 space-y-1">
                  {['ЦФО', 'СЗФО', 'ЮФО', 'СКФО', 'ПФО', 'УФО', 'СФО', 'ДФО'].map(district => (
                    <div key={district}>
                      <p className="text-xs font-semibold text-muted-foreground px-2 py-1">
                        {district}
                      </p>
                      {REGIONS
                        .filter(r => r.federalDistrict === district)
                        .map(region => (
                          <div
                            key={region.code}
                            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary cursor-pointer"
                            onClick={() => handleRegionToggle(region.code)}
                          >
                            <Checkbox 
                              checked={filters.regions.includes(region.code)}
                              className="pointer-events-none"
                            />
                            <span className="text-sm">{region.shortName}</span>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          {filters.regions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {filters.regions.slice(0, 3).map(code => {
                const region = REGIONS.find(r => r.code === code);
                return (
                  <Badge 
                    key={code} 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => handleRegionToggle(code)}
                  >
                    {region?.shortName}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                );
              })}
              {filters.regions.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{filters.regions.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Banknote className="h-3 w-3" />
            Цена НМЦК
          </Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={100}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(priceRange[0] * 10000000, true)}</span>
              <span>{priceRange[1] === 100 ? 'Любая' : formatCurrency(priceRange[1] * 10000000, true)}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Статус</Label>
          <div className="flex flex-wrap gap-1.5">
            {PROCUREMENT_STATUSES.slice(0, 6).map(status => (
              <Badge
                key={status.id}
                variant={filters.statuses.includes(status.id) ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => handleStatusToggle(status.id)}
              >
                {status.name.split(' ')[0]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Method */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Способ закупки</Label>
          <Select
            value={filters.methods[0] || 'all'}
            onValueChange={(value) => {
              setFilters({ methods: value === 'all' ? [] : [value] });
            }}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Все способы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все способы</SelectItem>
              {PROCUREMENT_METHODS.map(method => (
                <SelectItem key={method.id} value={method.id}>
                  {method.shortName} - {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Period */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Период
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {TIME_FILTERS.slice(0, 5).map(filter => (
              <Badge
                key={filter.id}
                variant="outline"
                className="cursor-pointer text-xs hover:bg-secondary"
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
