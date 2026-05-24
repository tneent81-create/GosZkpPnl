'use client';

import { useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Banknote, 
  Users, 
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Procurement } from '@/lib/types';
import { formatCurrency, calculateStats } from '@/lib/mock';

interface StatsOverviewProps {
  procurements: Procurement[];
}

export function StatsOverview({ procurements }: StatsOverviewProps) {
  const stats = useMemo(() => calculateStats(procurements), [procurements]);
  
  const cards = [
    {
      title: 'Всего закупок',
      value: stats.total.toLocaleString('ru-RU'),
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Общая сумма',
      value: formatCurrency(stats.totalSum, true),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Banknote,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Средняя экономия',
      value: `${stats.avgEconomyPercent.toFixed(1)}%`,
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: TrendingDown,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Прием заявок',
      value: stats.acceptingCount.toLocaleString('ru-RU'),
      change: `${((stats.acceptingCount / stats.total) * 100).toFixed(0)}%`,
      changeType: 'neutral' as const,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {card.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                ) : card.changeType === 'negative' ? (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                ) : null}
                <span className={`text-xs ${
                  card.changeType === 'positive' 
                    ? 'text-emerald-400' 
                    : card.changeType === 'negative'
                      ? 'text-red-400'
                      : 'text-muted-foreground'
                }`}>
                  {card.change}
                </span>
                <span className="text-xs text-muted-foreground">vs прошлый месяц</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface MiniChartProps {
  procurements: Procurement[];
  type: 'dynamics' | 'distribution';
}

export function MiniChart({ procurements, type }: MiniChartProps) {
  const stats = useMemo(() => calculateStats(procurements), [procurements]);
  
  if (type === 'distribution') {
    const statusData = Object.entries(stats.byStatus).map(([key, value]) => ({
      name: key,
      value,
      percentage: (value / stats.total * 100).toFixed(1),
    })).sort((a, b) => b.value - a.value).slice(0, 5);
    
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <PieChart className="h-4 w-4 text-primary" />
            Распределение по статусам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {statusData.map((item, index) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{item.name}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      index === 0 ? 'bg-primary' : 
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-emerald-500' :
                      index === 3 ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Dynamics chart (simplified bar representation)
  const methodData = Object.entries(stats.byMethod).map(([key, value]) => ({
    name: key,
    value,
  })).sort((a, b) => b.value - a.value).slice(0, 6);
  
  const maxValue = Math.max(...methodData.map(d => d.value));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          По способам закупки
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {methodData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12 truncate uppercase">
                {item.name}
              </span>
              <div className="flex-1 h-4 bg-secondary rounded overflow-hidden">
                <div 
                  className="h-full bg-primary/80 rounded transition-all"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
