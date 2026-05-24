'use client';

import { useMemo } from 'react';
import { 
  ExternalLink, 
  Building2, 
  MapPin, 
  Calendar,
  Users,
  TrendingDown,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Procurement } from '@/lib/types';
import { 
  formatCurrency, 
  formatDate, 
  formatRelativeDate, 
  getStatusInfo, 
  getMethodShortName 
} from '@/lib/mock';
import { REGIONS, OKPD2_CATEGORIES } from '@/lib/data';

interface ProcurementFeedProps {
  procurements: Procurement[];
  onSelect?: (procurement: Procurement) => void;
  selectedId?: string;
}

export function ProcurementFeed({ procurements, onSelect, selectedId }: ProcurementFeedProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-1">
        {procurements.map(procurement => (
          <ProcurementCard
            key={procurement.id}
            procurement={procurement}
            onSelect={onSelect}
            isSelected={selectedId === procurement.id}
          />
        ))}
        
        {procurements.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Закупки не найдены</p>
            <p className="text-sm">Попробуйте изменить параметры фильтрации</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

interface ProcurementCardProps {
  procurement: Procurement;
  onSelect?: (procurement: Procurement) => void;
  isSelected?: boolean;
}

function ProcurementCard({ procurement, onSelect, isSelected }: ProcurementCardProps) {
  const statusInfo = getStatusInfo(procurement.status);
  const methodShort = getMethodShortName(procurement.method);
  
  const region = useMemo(() => 
    REGIONS.find(r => r.code === procurement.region),
    [procurement.region]
  );
  
  const okpd2Name = useMemo(() => {
    const cat = OKPD2_CATEGORIES.find(c => c.code === procurement.okpd2[0]);
    return cat?.name || procurement.okpd2[0];
  }, [procurement.okpd2]);
  
  const daysLeft = useMemo(() => {
    const end = new Date(procurement.endDate);
    const now = new Date();
    return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }, [procurement.endDate]);
  
  const economy = procurement.contractPrice 
    ? ((procurement.nmck - procurement.contractPrice) / procurement.nmck * 100).toFixed(1)
    : null;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-primary/50 ${
        isSelected ? 'border-primary bg-primary/5' : ''
      }`}
      onClick={() => onSelect?.(procurement)}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs font-mono">
                {procurement.registryNumber}
              </Badge>
              <Badge variant="outline" className={`text-xs ${statusInfo.color}`}>
                {statusInfo.label}
              </Badge>
            </div>
            <h3 className="font-medium text-sm leading-tight line-clamp-2">
              {procurement.name}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              window.open(procurement.url, '_blank');
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Price info */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">НМЦК</p>
            <p className="font-semibold text-lg text-foreground">
              {formatCurrency(procurement.nmck, true)}
            </p>
          </div>
          {procurement.contractPrice && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Контракт</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg text-primary">
                  {formatCurrency(procurement.contractPrice, true)}
                </p>
                {economy && (
                  <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-400">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {economy}%
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Meta info */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{procurement.customer.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{region?.shortName || procurement.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {methodShort}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {procurement.law}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Окончание: {formatDate(procurement.endDate)}</span>
            </div>
            
            {daysLeft > 0 && procurement.status === 'accepting' && (
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  daysLeft <= 3 
                    ? 'bg-red-500/20 text-red-400' 
                    : daysLeft <= 7 
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                }`}
              >
                <Clock className="h-3 w-3 mr-1" />
                {daysLeft} дн.
              </Badge>
            )}
            
            {procurement.participantsCount && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{procurement.participantsCount} уч.</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
