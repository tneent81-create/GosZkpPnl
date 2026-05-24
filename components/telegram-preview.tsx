'use client';

import { useState } from 'react';
import { 
  Bot, 
  Send, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Filter,
  Star,
  BarChart3,
  Calculator,
  Bell,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/lib/store';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  buttons?: Array<{ text: string; callback: string }>;
  timestamp: Date;
}

export function TelegramPreview() {
  const { telegramConfig } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Добро пожаловать в ZakupkiBot!\n\nЯ помогу вам отслеживать госзакупки по вашим критериям.\n\nВыберите действие:',
      buttons: [
        { text: 'Поиск закупок', callback: 'search' },
        { text: 'Мои фильтры', callback: 'filters' },
        { text: 'Избранное', callback: 'favorites' },
        { text: 'Аналитика', callback: 'analytics' },
        { text: 'Калькулятор', callback: 'calc' },
        { text: 'Настройки', callback: 'settings' },
      ],
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentScreen, setCurrentScreen] = useState<'chat' | 'menu'>('chat');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Ищу закупки по вашему запросу...\n\nНайдено 247 закупок по запросу "' + inputValue + '"',
        buttons: [
          { text: 'Показать все', callback: 'show_all' },
          { text: 'Уточнить', callback: 'refine' },
        ],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleButtonClick = (callback: string) => {
    const responses: Record<string, Message> = {
      search: {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Введите поисковый запрос или выберите категорию:',
        buttons: [
          { text: 'Медицина', callback: 'cat_med' },
          { text: 'Строительство', callback: 'cat_build' },
          { text: 'IT', callback: 'cat_it' },
          { text: 'Продукты', callback: 'cat_food' },
        ],
        timestamp: new Date(),
      },
      filters: {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Ваши активные фильтры:\n\n• Регион: Москва, МО\n• Цена: до 10 млн\n• Статус: Прием заявок',
        buttons: [
          { text: 'Изменить', callback: 'edit_filters' },
          { text: 'Сбросить', callback: 'reset_filters' },
        ],
        timestamp: new Date(),
      },
      analytics: {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Статистика за сегодня:\n\n📊 Новых закупок: 1,247\n💰 Общая сумма: 8.5 млрд\n📉 Средняя экономия: 12.3%',
        buttons: [
          { text: 'Подробнее', callback: 'more_stats' },
          { text: 'Экспорт', callback: 'export' },
        ],
        timestamp: new Date(),
      },
    };
    
    const response = responses[callback] || {
      id: Date.now().toString(),
      type: 'bot' as const,
      content: 'Функция в разработке',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, response]);
  };

  const replyButtons = [
    { icon: Search, label: 'Поиск' },
    { icon: Filter, label: 'Фильтры' },
    { icon: Star, label: 'Избранное' },
    { icon: BarChart3, label: 'Аналитика' },
    { icon: Calculator, label: 'Калькулятор' },
    { icon: Settings, label: 'Настройки' },
  ];

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2 shrink-0">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            Telegram Preview
          </div>
          <Badge variant="secondary" className="text-xs">
            {telegramConfig.commands.filter(c => c.enabled).length} команд
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Phone frame */}
        <div className="flex-1 flex flex-col mx-3 mb-3 rounded-xl border border-border overflow-hidden bg-[#0e1621]">
          {/* Header */}
          <div className="flex items-center gap-3 p-3 bg-[#17212b] border-b border-border/50">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">ZakupkiBot</p>
              <p className="text-xs text-muted-foreground">онлайн</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-[#182533] text-white rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    {message.buttons && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.buttons.map((btn, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs bg-[#2b5278] hover:bg-[#3a6a99] border-0 text-white"
                            onClick={() => handleButtonClick(btn.callback)}
                          >
                            {btn.text}
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Reply keyboard */}
          <div className="p-2 bg-[#17212b] border-t border-border/50">
            <div className="grid grid-cols-3 gap-1 mb-2">
              {replyButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <Button
                    key={btn.label}
                    variant="ghost"
                    className="h-8 text-xs bg-[#232e3c] hover:bg-[#2b3a4d] text-white"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {btn.label}
                  </Button>
                );
              })}
            </div>
            
            {/* Input */}
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Сообщение..."
                className="flex-1 h-9 text-sm bg-[#242f3d] border-0 text-white placeholder:text-muted-foreground"
              />
              <Button
                size="icon"
                className="h-9 w-9"
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
