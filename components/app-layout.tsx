'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Puzzle, 
  BarChart3, 
  Calculator, 
  Bot, 
  Settings,
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/lib/store';

interface AppLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Дашборд', href: '/' },
  { id: 'constructor', icon: Puzzle, label: 'Конструктор', href: '/constructor' },
  { id: 'analytics', icon: BarChart3, label: 'Аналитика', href: '/analytics' },
  { id: 'calculator', icon: Calculator, label: 'Калькуляторы', href: '/calculator' },
  { id: 'bot', icon: Bot, label: 'Telegram-бот', href: '/bot-config' },
  { id: 'settings', icon: Settings, label: 'Настройки', href: '/settings' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen, setSidebarOpen, activeTab, setActiveTab, enabledModules } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
        <div className="flex h-full items-center gap-4 px-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-none">ZakupkiBot</h1>
              <p className="text-xs text-muted-foreground">Constructor</p>
            </div>
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Search */}
          <div className="hidden md:flex relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск закупок..."
              className="pl-9 w-64 bg-secondary"
            />
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Enabled modules count */}
            <Badge variant="outline" className="hidden sm:flex gap-1">
              <Puzzle className="h-3 w-3" />
              {enabledModules.length}
            </Badge>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  zakupki.gov.ru
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="fixed left-0 top-14 bottom-0 w-64 bg-card border-r border-border p-4">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
      
      {/* Main content */}
      <main className="min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}
