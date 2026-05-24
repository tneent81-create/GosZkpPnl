import type { Procurement } from './types';
import { REGIONS, PROCUREMENT_METHODS, PROCUREMENT_STATUSES, ETPS, OKPD2_CATEGORIES } from './data';

// Generate realistic mock procurements
export function generateMockProcurements(count: number = 50): Procurement[] {
  const procurements: Procurement[] = [];
  
  const customerNames = [
    'ГБУЗ "Городская клиническая больница №1"',
    'Министерство здравоохранения Московской области',
    'ФГБУ "Национальный медицинский исследовательский центр"',
    'Администрация города Москвы',
    'ГБОУ "Средняя общеобразовательная школа №547"',
    'ГКУ "Дирекция по эксплуатации зданий"',
    'ФГУП "Почта России"',
    'ПАО "Газпром"',
    'ОАО "РЖД"',
    'ФГБОУ ВО "Московский государственный университет"',
    'ГБУ "Жилищник района Хамовники"',
    'ГБУЗ "Детская городская поликлиника №110"',
    'Министерство образования Республики Татарстан',
    'Администрация Краснодарского края',
    'ФКУ "Исправительная колония №7"',
  ];
  
  const procurementNames = [
    'Поставка лекарственных препаратов',
    'Капитальный ремонт здания',
    'Поставка компьютерного оборудования',
    'Оказание услуг по уборке помещений',
    'Поставка продуктов питания',
    'Разработка программного обеспечения',
    'Поставка медицинского оборудования',
    'Текущий ремонт дорожного покрытия',
    'Оказание охранных услуг',
    'Поставка офисной мебели',
    'Техническое обслуживание инженерных систем',
    'Поставка горюче-смазочных материалов',
    'Строительство многоквартирного жилого дома',
    'Благоустройство территории',
    'Поставка школьного оборудования',
    'Оказание услуг по организации питания',
    'Модернизация системы видеонаблюдения',
    'Поставка спецодежды и СИЗ',
    'Проектирование объекта капитального строительства',
    'Поставка серверного оборудования',
  ];
  
  for (let i = 0; i < count; i++) {
    const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    const method = PROCUREMENT_METHODS[Math.floor(Math.random() * PROCUREMENT_METHODS.length)];
    const status = PROCUREMENT_STATUSES[Math.floor(Math.random() * PROCUREMENT_STATUSES.length)];
    const etp = ETPS[Math.floor(Math.random() * ETPS.length)];
    const okpd2 = OKPD2_CATEGORIES[Math.floor(Math.random() * OKPD2_CATEGORIES.length)];
    
    const nmck = Math.floor(Math.random() * 100000000) + 100000;
    const economyPercent = Math.random() * 0.3;
    const contractPrice = status.id === 'completed' || status.id === 'execution' 
      ? Math.floor(nmck * (1 - economyPercent))
      : undefined;
    
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() - Math.floor(Math.random() * 30));
    
    const endDate = new Date(publishDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 20) + 5);
    
    const auctionDate = new Date(endDate);
    auctionDate.setDate(auctionDate.getDate() + 3);
    
    procurements.push({
      id: `proc-${i + 1}`,
      registryNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      name: procurementNames[Math.floor(Math.random() * procurementNames.length)],
      customer: {
        id: `cust-${Math.floor(Math.random() * 1000)}`,
        name: customerNames[Math.floor(Math.random() * customerNames.length)],
        inn: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        region: region.name,
      },
      nmck,
      contractPrice,
      currency: 'RUB',
      status: status.id,
      method: method.id,
      law: method.law,
      okpd2: [okpd2.code],
      publishDate: publishDate.toISOString(),
      endDate: endDate.toISOString(),
      auctionDate: auctionDate.toISOString(),
      region: region.code,
      etp: etp.id,
      applicationSecurity: nmck * 0.01,
      contractSecurity: nmck * 0.05,
      participantsCount: Math.floor(Math.random() * 10) + 1,
      url: `https://zakupki.gov.ru/epz/order/notice/printForm/view.html?regNumber=${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    });
  }
  
  return procurements.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Format currency
export function formatCurrency(value: number, compact: boolean = false): string {
  if (compact) {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} млрд`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} млн`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} тыс.`;
    }
    return value.toFixed(0);
  }
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Format relative date
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} дн. назад`;
  }
  if (diffDays === 0) {
    return 'Сегодня';
  }
  if (diffDays === 1) {
    return 'Завтра';
  }
  if (diffDays <= 7) {
    return `Через ${diffDays} дн.`;
  }
  
  return formatDate(dateString);
}

// Get status info
export function getStatusInfo(statusId: string) {
  const statusMap: Record<string, { label: string; color: string }> = {
    accepting: { label: 'Прием заявок', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    accepted: { label: 'Заявки приняты', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    commission: { label: 'Работа комиссии', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    determining: { label: 'Определение', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    contracting: { label: 'Контракт', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    execution: { label: 'Исполнение', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    completed: { label: 'Исполнен', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    cancelled: { label: 'Отменена', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    failed: { label: 'Не состоялась', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    suspended: { label: 'Приостановлена', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    appeal: { label: 'Обжалование', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    terminated: { label: 'Расторгнут', color: 'bg-red-700/20 text-red-300 border-red-700/30' },
  };
  
  return statusMap[statusId] || { label: statusId, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
}

// Get method short name
export function getMethodShortName(methodId: string): string {
  const methodMap: Record<string, string> = {
    ea: 'ЭА',
    ok: 'ОК',
    kou: 'КОУ',
    dk: 'ДК',
    zk: 'ЗК',
    za: 'ЗА',
    zkef: 'ЗКЭФ',
    zaef: 'ЗАЭФ',
    zk_kotir: 'ЗК',
    zkef_kotir: 'ЗКЭФ',
    zp: 'ЗП',
    ep: 'ЕП',
    kp: 'КП',
    mz: 'МЗ',
    '223': '223-ФЗ',
  };
  
  return methodMap[methodId] || methodId;
}

// Calculate statistics
export function calculateStats(procurements: Procurement[]) {
  const total = procurements.length;
  const totalSum = procurements.reduce((sum, p) => sum + p.nmck, 0);
  const avgPrice = total > 0 ? totalSum / total : 0;
  
  const completedProcurements = procurements.filter(p => p.contractPrice);
  const totalEconomy = completedProcurements.reduce((sum, p) => 
    sum + (p.nmck - (p.contractPrice || p.nmck)), 0
  );
  const avgEconomyPercent = completedProcurements.length > 0
    ? (totalEconomy / completedProcurements.reduce((sum, p) => sum + p.nmck, 0)) * 100
    : 0;
  
  const acceptingCount = procurements.filter(p => p.status === 'accepting').length;
  
  const byStatus = procurements.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byMethod = procurements.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byRegion = procurements.reduce((acc, p) => {
    acc[p.region] = (acc[p.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    totalSum,
    avgPrice,
    totalEconomy,
    avgEconomyPercent,
    acceptingCount,
    byStatus,
    byMethod,
    byRegion,
  };
}

// Generate chart data
export function generateChartData(procurements: Procurement[]) {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayProcurements = procurements.filter(p => 
      p.publishDate.split('T')[0] === dateStr
    );
    
    last7Days.push({
      date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      count: dayProcurements.length,
      sum: dayProcurements.reduce((sum, p) => sum + p.nmck, 0) / 1000000,
    });
  }
  
  return last7Days;
}
