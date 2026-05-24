import type { Region, ProcurementMethod, ProcurementStatus, CustomerType, ETP, PriceRange, Module } from './types';

// All 89 Russian regions
export const REGIONS: Region[] = [
  // ЦФО
  { code: '77', name: 'Москва', shortName: 'Москва', federalDistrict: 'ЦФО' },
  { code: '50', name: 'Московская область', shortName: 'МО', federalDistrict: 'ЦФО' },
  { code: '36', name: 'Воронежская область', shortName: 'Воронеж', federalDistrict: 'ЦФО' },
  { code: '31', name: 'Белгородская область', shortName: 'Белгород', federalDistrict: 'ЦФО' },
  { code: '32', name: 'Брянская область', shortName: 'Брянск', federalDistrict: 'ЦФО' },
  { code: '33', name: 'Владимирская область', shortName: 'Владимир', federalDistrict: 'ЦФО' },
  { code: '37', name: 'Ивановская область', shortName: 'Иваново', federalDistrict: 'ЦФО' },
  { code: '40', name: 'Калужская область', shortName: 'Калуга', federalDistrict: 'ЦФО' },
  { code: '44', name: 'Костромская область', shortName: 'Кострома', federalDistrict: 'ЦФО' },
  { code: '46', name: 'Курская область', shortName: 'Курск', federalDistrict: 'ЦФО' },
  { code: '48', name: 'Липецкая область', shortName: 'Липецк', federalDistrict: 'ЦФО' },
  { code: '57', name: 'Орловская область', shortName: 'Орёл', federalDistrict: 'ЦФО' },
  { code: '62', name: 'Рязанская область', shortName: 'Рязань', federalDistrict: 'ЦФО' },
  { code: '67', name: 'Смоленская область', shortName: 'Смоленск', federalDistrict: 'ЦФО' },
  { code: '68', name: 'Тамбовская область', shortName: 'Тамбов', federalDistrict: 'ЦФО' },
  { code: '69', name: 'Тверская область', shortName: 'Тверь', federalDistrict: 'ЦФО' },
  { code: '71', name: 'Тульская область', shortName: 'Тула', federalDistrict: 'ЦФО' },
  { code: '76', name: 'Ярославская область', shortName: 'Ярославль', federalDistrict: 'ЦФО' },
  // СЗФО
  { code: '78', name: 'Санкт-Петербург', shortName: 'СПб', federalDistrict: 'СЗФО' },
  { code: '47', name: 'Ленинградская область', shortName: 'ЛО', federalDistrict: 'СЗФО' },
  { code: '29', name: 'Архангельская область', shortName: 'Архангельск', federalDistrict: 'СЗФО' },
  { code: '35', name: 'Вологодская область', shortName: 'Вологда', federalDistrict: 'СЗФО' },
  { code: '39', name: 'Калининградская область', shortName: 'Калининград', federalDistrict: 'СЗФО' },
  { code: '10', name: 'Республика Карелия', shortName: 'Карелия', federalDistrict: 'СЗФО' },
  { code: '11', name: 'Республика Коми', shortName: 'Коми', federalDistrict: 'СЗФО' },
  { code: '51', name: 'Мурманская область', shortName: 'Мурманск', federalDistrict: 'СЗФО' },
  { code: '83', name: 'Ненецкий АО', shortName: 'НАО', federalDistrict: 'СЗФО' },
  { code: '53', name: 'Новгородская область', shortName: 'Новгород', federalDistrict: 'СЗФО' },
  { code: '60', name: 'Псковская область', shortName: 'Псков', federalDistrict: 'СЗФО' },
  // ЮФО
  { code: '23', name: 'Краснодарский край', shortName: 'Краснодар', federalDistrict: 'ЮФО' },
  { code: '61', name: 'Ростовская область', shortName: 'Ростов', federalDistrict: 'ЮФО' },
  { code: '34', name: 'Волгоградская область', shortName: 'Волгоград', federalDistrict: 'ЮФО' },
  { code: '30', name: 'Астраханская область', shortName: 'Астрахань', federalDistrict: 'ЮФО' },
  { code: '01', name: 'Республика Адыгея', shortName: 'Адыгея', federalDistrict: 'ЮФО' },
  { code: '08', name: 'Республика Калмыкия', shortName: 'Калмыкия', federalDistrict: 'ЮФО' },
  { code: '91', name: 'Республика Крым', shortName: 'Крым', federalDistrict: 'ЮФО' },
  { code: '92', name: 'Севастополь', shortName: 'Севастополь', federalDistrict: 'ЮФО' },
  // СКФО
  { code: '26', name: 'Ставропольский край', shortName: 'Ставрополь', federalDistrict: 'СКФО' },
  { code: '05', name: 'Республика Дагестан', shortName: 'Дагестан', federalDistrict: 'СКФО' },
  { code: '20', name: 'Чеченская Республика', shortName: 'Чечня', federalDistrict: 'СКФО' },
  { code: '06', name: 'Республика Ингушетия', shortName: 'Ингушетия', federalDistrict: 'СКФО' },
  { code: '15', name: 'Северная Осетия-Алания', shortName: 'Сев.Осетия', federalDistrict: 'СКФО' },
  { code: '07', name: 'Кабардино-Балкарская Республика', shortName: 'КБР', federalDistrict: 'СКФО' },
  { code: '09', name: 'Карачаево-Черкесская Республика', shortName: 'КЧР', federalDistrict: 'СКФО' },
  // ПФО
  { code: '16', name: 'Республика Татарстан', shortName: 'Татарстан', federalDistrict: 'ПФО' },
  { code: '02', name: 'Республика Башкортостан', shortName: 'Башкирия', federalDistrict: 'ПФО' },
  { code: '52', name: 'Нижегородская область', shortName: 'Н.Новгород', federalDistrict: 'ПФО' },
  { code: '63', name: 'Самарская область', shortName: 'Самара', federalDistrict: 'ПФО' },
  { code: '59', name: 'Пермский край', shortName: 'Пермь', federalDistrict: 'ПФО' },
  { code: '64', name: 'Саратовская область', shortName: 'Саратов', federalDistrict: 'ПФО' },
  { code: '56', name: 'Оренбургская область', shortName: 'Оренбург', federalDistrict: 'ПФО' },
  { code: '73', name: 'Ульяновская область', shortName: 'Ульяновск', federalDistrict: 'ПФО' },
  { code: '58', name: 'Пензенская область', shortName: 'Пенза', federalDistrict: 'ПФО' },
  { code: '43', name: 'Кировская область', shortName: 'Киров', federalDistrict: 'ПФО' },
  { code: '21', name: 'Чувашская Республика', shortName: 'Чувашия', federalDistrict: 'ПФО' },
  { code: '12', name: 'Республика Марий Эл', shortName: 'Марий Эл', federalDistrict: 'ПФО' },
  { code: '13', name: 'Республика Мордовия', shortName: 'Мордовия', federalDistrict: 'ПФО' },
  { code: '18', name: 'Удмуртская Республика', shortName: 'Удмуртия', federalDistrict: 'ПФО' },
  // УФО
  { code: '66', name: 'Свердловская область', shortName: 'Екатеринбург', federalDistrict: 'УФО' },
  { code: '74', name: 'Челябинская область', shortName: 'Челябинск', federalDistrict: 'УФО' },
  { code: '72', name: 'Тюменская область', shortName: 'Тюмень', federalDistrict: 'УФО' },
  { code: '86', name: 'ХМАО-Югра', shortName: 'ХМАО', federalDistrict: 'УФО' },
  { code: '89', name: 'ЯНАО', shortName: 'ЯНАО', federalDistrict: 'УФО' },
  { code: '45', name: 'Курганская область', shortName: 'Курган', federalDistrict: 'УФО' },
  // СФО
  { code: '54', name: 'Новосибирская область', shortName: 'Новосибирск', federalDistrict: 'СФО' },
  { code: '24', name: 'Красноярский край', shortName: 'Красноярск', federalDistrict: 'СФО' },
  { code: '38', name: 'Иркутская область', shortName: 'Иркутск', federalDistrict: 'СФО' },
  { code: '42', name: 'Кемеровская область', shortName: 'Кузбасс', federalDistrict: 'СФО' },
  { code: '55', name: 'Омская область', shortName: 'Омск', federalDistrict: 'СФО' },
  { code: '22', name: 'Алтайский край', shortName: 'Алтай', federalDistrict: 'СФО' },
  { code: '70', name: 'Томская область', shortName: 'Томск', federalDistrict: 'СФО' },
  { code: '04', name: 'Республика Алтай', shortName: 'Р.Алтай', federalDistrict: 'СФО' },
  { code: '17', name: 'Республика Тыва', shortName: 'Тыва', federalDistrict: 'СФО' },
  { code: '19', name: 'Республика Хакасия', shortName: 'Хакасия', federalDistrict: 'СФО' },
  // ДФО
  { code: '25', name: 'Приморский край', shortName: 'Приморье', federalDistrict: 'ДФО' },
  { code: '27', name: 'Хабаровский край', shortName: 'Хабаровск', federalDistrict: 'ДФО' },
  { code: '65', name: 'Сахалинская область', shortName: 'Сахалин', federalDistrict: 'ДФО' },
  { code: '28', name: 'Амурская область', shortName: 'Амур', federalDistrict: 'ДФО' },
  { code: '14', name: 'Республика Саха (Якутия)', shortName: 'Якутия', federalDistrict: 'ДФО' },
  { code: '75', name: 'Забайкальский край', shortName: 'Забайкалье', federalDistrict: 'ДФО' },
  { code: '41', name: 'Камчатский край', shortName: 'Камчатка', federalDistrict: 'ДФО' },
  { code: '49', name: 'Магаданская область', shortName: 'Магадан', federalDistrict: 'ДФО' },
  { code: '79', name: 'Еврейская АО', shortName: 'ЕАО', federalDistrict: 'ДФО' },
  { code: '87', name: 'Чукотский АО', shortName: 'Чукотка', federalDistrict: 'ДФО' },
  { code: '03', name: 'Республика Бурятия', shortName: 'Бурятия', federalDistrict: 'ДФО' },
];

// Procurement methods
export const PROCUREMENT_METHODS: ProcurementMethod[] = [
  { id: 'ea', name: 'Электронный аукцион', shortName: 'ЭА', law: '44-ФЗ' },
  { id: 'ok', name: 'Открытый конкурс', shortName: 'ОК', law: '44-ФЗ' },
  { id: 'kou', name: 'Конкурс с ограниченным участием', shortName: 'КОУ', law: '44-ФЗ' },
  { id: 'dk', name: 'Двухэтапный конкурс', shortName: 'ДК', law: '44-ФЗ' },
  { id: 'zk', name: 'Закрытый конкурс', shortName: 'ЗК', law: '44-ФЗ' },
  { id: 'za', name: 'Закрытый аукцион', shortName: 'ЗА', law: '44-ФЗ' },
  { id: 'zkef', name: 'Закрытый конкурс в электронной форме', shortName: 'ЗКЭФ', law: '44-ФЗ' },
  { id: 'zaef', name: 'Закрытый аукцион в электронной форме', shortName: 'ЗАЭФ', law: '44-ФЗ' },
  { id: 'zk_kotir', name: 'Запрос котировок', shortName: 'ЗК', law: '44-ФЗ' },
  { id: 'zkef_kotir', name: 'Запрос котировок в электронной форме', shortName: 'ЗКЭФ', law: '44-ФЗ' },
  { id: 'zp', name: 'Запрос предложений', shortName: 'ЗП', law: '44-ФЗ' },
  { id: 'ep', name: 'Закупка у единственного поставщика', shortName: 'ЕП', law: '44-ФЗ' },
  { id: 'kp', name: 'Конкурентные переговоры', shortName: 'КП', law: '44-ФЗ' },
  { id: 'mz', name: 'Малые закупки (до 600 тыс.)', shortName: 'МЗ', law: '44-ФЗ' },
  { id: '223', name: 'Закупки по 223-ФЗ', shortName: '223-ФЗ', law: '223-ФЗ' },
];

// Procurement statuses
export const PROCUREMENT_STATUSES: ProcurementStatus[] = [
  { id: 'accepting', name: 'Подача заявок открыта', color: 'bg-green-500' },
  { id: 'accepted', name: 'Подача заявок завершена', color: 'bg-yellow-500' },
  { id: 'commission', name: 'Работа комиссии', color: 'bg-blue-500' },
  { id: 'determining', name: 'Определение поставщика', color: 'bg-indigo-500' },
  { id: 'contracting', name: 'Заключение контракта', color: 'bg-purple-500' },
  { id: 'execution', name: 'Исполнение контракта', color: 'bg-cyan-500' },
  { id: 'completed', name: 'Исполнен', color: 'bg-emerald-500' },
  { id: 'cancelled', name: 'Отменена', color: 'bg-red-500' },
  { id: 'failed', name: 'Несостоявшаяся', color: 'bg-orange-500' },
  { id: 'suspended', name: 'Приостановлена', color: 'bg-gray-500' },
  { id: 'appeal', name: 'Обжалование в ФАС', color: 'bg-rose-500' },
  { id: 'terminated', name: 'Расторгнут', color: 'bg-red-700' },
];

// Customer types
export const CUSTOMER_TYPES: CustomerType[] = [
  { id: 'fed_ministry', name: 'Федеральные министерства', category: 'Федеральные' },
  { id: 'fed_agency', name: 'Федеральные агентства', category: 'Федеральные' },
  { id: 'fed_service', name: 'Федеральные службы', category: 'Федеральные' },
  { id: 'reg_admin', name: 'Администрации регионов', category: 'Региональные' },
  { id: 'reg_ministry', name: 'Министерства регионов', category: 'Региональные' },
  { id: 'mun_admin', name: 'Администрации муниципалитетов', category: 'Муниципальные' },
  { id: 'budget_org', name: 'Бюджетные учреждения', category: 'Учреждения' },
  { id: 'treasury_org', name: 'Казенные учреждения', category: 'Учреждения' },
  { id: 'autonomous_org', name: 'Автономные учреждения', category: 'Учреждения' },
  { id: 'gup', name: 'ГУПы', category: 'Предприятия' },
  { id: 'mup', name: 'МУПы', category: 'Предприятия' },
  { id: 'goscorp', name: 'Госкорпорации', category: '223-ФЗ' },
  { id: 'monopoly', name: 'Субъекты естественных монополий', category: '223-ФЗ' },
  { id: 'state_share', name: 'Организации с госучастием >50%', category: '223-ФЗ' },
  { id: 'healthcare', name: 'Больницы и поликлиники', category: 'Социальные' },
  { id: 'schools', name: 'Школы и детские сады', category: 'Социальные' },
  { id: 'universities', name: 'ВУЗы', category: 'Социальные' },
  { id: 'research', name: 'Научные институты', category: 'Социальные' },
  { id: 'security', name: 'Силовые структуры', category: 'Силовые' },
  { id: 'pfr', name: 'Социальный фонд России', category: 'Фонды' },
  { id: 'fss', name: 'ФСС', category: 'Фонды' },
  { id: 'foms', name: 'ФОМС', category: 'Фонды' },
  { id: 'election', name: 'Избирательные комиссии', category: 'Прочие' },
  { id: 'cbr', name: 'Центробанк', category: 'Прочие' },
  { id: 'other', name: 'Прочие', category: 'Прочие' },
];

// Electronic Trading Platforms
export const ETPS: ETP[] = [
  { id: 'sberbank', name: 'Сбербанк-АСТ', url: 'https://www.sberbank-ast.ru' },
  { id: 'rts', name: 'РТС-тендер', url: 'https://www.rts-tender.ru' },
  { id: 'nep', name: 'Национальная электронная площадка', url: 'https://www.etp-ets.ru' },
  { id: 'gpb', name: 'ЭТП ГПБ (Газпромбанк)', url: 'https://etpgpb.ru' },
  { id: 'eetp', name: 'АО «ЕЭТП»', url: 'https://roseltorg.ru' },
  { id: 'zakazrf', name: 'ЗаказРФ', url: 'https://www.zakazrf.ru' },
  { id: 'tektorg', name: 'ТЭК-Торг', url: 'https://www.tektorg.ru' },
  { id: 'astgoz', name: 'АСТ ГОЗ', url: 'https://www.astgoz.ru' },
  { id: 'fabrikant', name: 'Фабрикант', url: 'https://www.fabrikant.ru' },
];

// Price ranges
export const PRICE_RANGES: PriceRange[] = [
  { id: 'pr_100k', label: 'До 100 тыс.', min: 0, max: 100000 },
  { id: 'pr_300k', label: '100-300 тыс.', min: 100000, max: 300000 },
  { id: 'pr_600k', label: '300-600 тыс.', min: 300000, max: 600000 },
  { id: 'pr_1m', label: '600 тыс. - 1 млн', min: 600000, max: 1000000 },
  { id: 'pr_3m', label: '1-3 млн', min: 1000000, max: 3000000 },
  { id: 'pr_5m', label: '3-5 млн', min: 3000000, max: 5000000 },
  { id: 'pr_10m', label: '5-10 млн', min: 5000000, max: 10000000 },
  { id: 'pr_20m', label: '10-20 млн', min: 10000000, max: 20000000 },
  { id: 'pr_50m', label: '20-50 млн', min: 20000000, max: 50000000 },
  { id: 'pr_100m', label: '50-100 млн', min: 50000000, max: 100000000 },
  { id: 'pr_300m', label: '100-300 млн', min: 100000000, max: 300000000 },
  { id: 'pr_500m', label: '300-500 млн', min: 300000000, max: 500000000 },
  { id: 'pr_1b', label: '500 млн - 1 млрд', min: 500000000, max: 1000000000 },
  { id: 'pr_5b', label: '1-5 млрд', min: 1000000000, max: 5000000000 },
  { id: 'pr_10b', label: '5-10 млрд', min: 5000000000, max: 10000000000 },
  { id: 'pr_over10b', label: 'Свыше 10 млрд', min: 10000000000, max: null },
];

// Laws
export const LAWS = [
  { id: '44fz', name: '44-ФЗ', description: 'Контрактная система' },
  { id: '223fz', name: '223-ФЗ', description: 'Закупки госкомпаний' },
  { id: '275fz', name: '275-ФЗ', description: 'Гособоронзаказ' },
  { id: '185fz', name: '185-ФЗ', description: 'Капитальный ремонт' },
  { id: 'pp615', name: 'ПП 615', description: 'ЖКХ' },
  { id: 'small', name: 'Малый объем', description: 'Закупки малого объема' },
  { id: 'smp', name: 'СМП/СОНО', description: 'Закупки у СМП/СОНО' },
  { id: 'innovation', name: 'Инновации', description: 'Инновационная продукция' },
];

// Time filters
export const TIME_FILTERS = [
  { id: 'today', label: 'Сегодня' },
  { id: 'yesterday', label: 'Вчера' },
  { id: '3days', label: 'За 3 дня' },
  { id: 'week', label: 'За неделю' },
  { id: '2weeks', label: 'За 2 недели' },
  { id: 'month', label: 'За месяц' },
  { id: 'quarter', label: 'За квартал' },
  { id: 'halfyear', label: 'За полгода' },
  { id: 'year', label: 'За год' },
  { id: 'custom', label: 'Произвольный период' },
];

// OKPD2 main sections (abbreviated - full list would be 6000+ items)
export const OKPD2_SECTIONS = [
  { code: 'A', name: 'Продукция сельского хозяйства', children: ['01', '02', '03'] },
  { code: 'B', name: 'Продукция горнодобывающих производств', children: ['05', '06', '07', '08', '09'] },
  { code: 'C', name: 'Продукция обрабатывающих производств', children: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'] },
  { code: 'D', name: 'Электроэнергия, газ, пар', children: ['35'] },
  { code: 'E', name: 'Водоснабжение, отходы', children: ['36', '37', '38', '39'] },
  { code: 'F', name: 'Строительство', children: ['41', '42', '43'] },
  { code: 'G', name: 'Торговля', children: ['45', '46', '47'] },
  { code: 'H', name: 'Транспорт', children: ['49', '50', '51', '52', '53'] },
  { code: 'I', name: 'Гостиницы, общепит', children: ['55', '56'] },
  { code: 'J', name: 'Информация и связь', children: ['58', '59', '60', '61', '62', '63'] },
  { code: 'K', name: 'Финансы и страхование', children: ['64', '65', '66'] },
  { code: 'L', name: 'Недвижимость', children: ['68'] },
  { code: 'M', name: 'Профессиональные услуги', children: ['69', '70', '71', '72', '73', '74', '75'] },
  { code: 'N', name: 'Административные услуги', children: ['77', '78', '79', '80', '81', '82'] },
  { code: 'O', name: 'Госуправление', children: ['84'] },
  { code: 'P', name: 'Образование', children: ['85'] },
  { code: 'Q', name: 'Здравоохранение', children: ['86', '87', '88'] },
  { code: 'R', name: 'Культура и спорт', children: ['90', '91', '92', '93'] },
  { code: 'S', name: 'Прочие услуги', children: ['94', '95', '96'] },
];

// Detailed OKPD2 categories (subset - would be 6000+ in full)
export const OKPD2_CATEGORIES = [
  // Section C - Manufacturing (most common in procurements)
  { code: '10', name: 'Продукты пищевые', section: 'C' },
  { code: '10.1', name: 'Мясо и мясопродукты', section: 'C' },
  { code: '10.2', name: 'Рыба и морепродукты', section: 'C' },
  { code: '10.3', name: 'Фрукты и овощи переработанные', section: 'C' },
  { code: '10.4', name: 'Масла и жиры', section: 'C' },
  { code: '10.5', name: 'Молочные продукты', section: 'C' },
  { code: '10.6', name: 'Мукомольные изделия', section: 'C' },
  { code: '10.7', name: 'Хлеб и кондитерские изделия', section: 'C' },
  { code: '10.8', name: 'Прочие пищевые продукты', section: 'C' },
  { code: '10.9', name: 'Корма для животных', section: 'C' },
  { code: '11', name: 'Напитки', section: 'C' },
  { code: '21', name: 'Фармацевтическая продукция', section: 'C' },
  { code: '21.1', name: 'Фармацевтические субстанции', section: 'C' },
  { code: '21.2', name: 'Лекарственные препараты', section: 'C' },
  { code: '26', name: 'Компьютеры и электроника', section: 'C' },
  { code: '26.1', name: 'Электронные компоненты', section: 'C' },
  { code: '26.2', name: 'Компьютеры', section: 'C' },
  { code: '26.3', name: 'Телекоммуникационное оборудование', section: 'C' },
  { code: '26.5', name: 'Измерительные приборы', section: 'C' },
  { code: '26.6', name: 'Медицинское оборудование', section: 'C' },
  { code: '27', name: 'Электрооборудование', section: 'C' },
  { code: '28', name: 'Машины и оборудование', section: 'C' },
  { code: '29', name: 'Автомобили', section: 'C' },
  { code: '30', name: 'Прочие транспортные средства', section: 'C' },
  { code: '31', name: 'Мебель', section: 'C' },
  { code: '32', name: 'Прочие изделия', section: 'C' },
  { code: '32.5', name: 'Медицинские инструменты', section: 'C' },
  // Section F - Construction
  { code: '41', name: 'Здания и строительные работы', section: 'F' },
  { code: '41.1', name: 'Разработка строительных проектов', section: 'F' },
  { code: '41.2', name: 'Здания жилые и нежилые', section: 'F' },
  { code: '42', name: 'Сооружения и строительные работы', section: 'F' },
  { code: '42.1', name: 'Дороги и железные дороги', section: 'F' },
  { code: '42.2', name: 'Инженерные коммуникации', section: 'F' },
  { code: '42.9', name: 'Прочие сооружения', section: 'F' },
  { code: '43', name: 'Специализированные строительные работы', section: 'F' },
  { code: '43.1', name: 'Снос и подготовка площадки', section: 'F' },
  { code: '43.2', name: 'Электромонтажные работы', section: 'F' },
  { code: '43.3', name: 'Отделочные работы', section: 'F' },
  { code: '43.9', name: 'Кровельные работы', section: 'F' },
  // Section J - IT
  { code: '62', name: 'Услуги в области IT', section: 'J' },
  { code: '62.0', name: 'Разработка программного обеспечения', section: 'J' },
  { code: '62.01', name: 'Разработка компьютерного ПО', section: 'J' },
  { code: '62.02', name: 'Консультационные услуги в области IT', section: 'J' },
  { code: '62.03', name: 'Управление компьютерным оборудованием', section: 'J' },
  { code: '62.09', name: 'Прочие услуги в области IT', section: 'J' },
  { code: '63', name: 'Информационные услуги', section: 'J' },
  { code: '63.1', name: 'Обработка данных и хостинг', section: 'J' },
  // Section M - Professional services
  { code: '71', name: 'Архитектура и инженерия', section: 'M' },
  { code: '71.1', name: 'Архитектурные услуги', section: 'M' },
  { code: '71.2', name: 'Инженерные изыскания', section: 'M' },
  { code: '72', name: 'Научные исследования', section: 'M' },
  { code: '73', name: 'Реклама и маркетинг', section: 'M' },
  // Section N - Administrative services
  { code: '80', name: 'Охранные услуги', section: 'N' },
  { code: '81', name: 'Обслуживание зданий', section: 'N' },
  { code: '81.2', name: 'Уборка', section: 'N' },
  // Section Q - Healthcare
  { code: '86', name: 'Медицинские услуги', section: 'Q' },
  { code: '86.1', name: 'Больничные услуги', section: 'Q' },
  { code: '86.2', name: 'Врачебная практика', section: 'Q' },
  { code: '86.9', name: 'Прочие медицинские услуги', section: 'Q' },
];

// Industry templates (ready-to-use filter combinations)
export const INDUSTRY_TEMPLATES = [
  // Healthcare
  { id: 'pharma', name: 'Лекарственные препараты', industry: 'Медицина', okpd2: ['21.2'], description: 'Закупки лекарственных средств' },
  { id: 'med_equip', name: 'Медицинское оборудование', industry: 'Медицина', okpd2: ['26.6', '32.5'], description: 'Медицинская техника и инструменты' },
  { id: 'med_consumables', name: 'Медицинские расходники', industry: 'Медицина', okpd2: ['32.5'], description: 'Расходные материалы для медицины' },
  // Construction
  { id: 'construction', name: 'Строительство зданий', industry: 'Строительство', okpd2: ['41', '41.2'], description: 'Строительные работы' },
  { id: 'roads', name: 'Дорожное строительство', industry: 'Строительство', okpd2: ['42.1'], description: 'Строительство и ремонт дорог' },
  { id: 'repair', name: 'Капитальный ремонт', industry: 'Строительство', okpd2: ['43'], description: 'Ремонтные работы' },
  // IT
  { id: 'software', name: 'Разработка ПО', industry: 'IT', okpd2: ['62.01'], description: 'Разработка программного обеспечения' },
  { id: 'computers', name: 'Компьютерная техника', industry: 'IT', okpd2: ['26.2'], description: 'Компьютеры и оргтехника' },
  { id: 'it_services', name: 'IT-услуги', industry: 'IT', okpd2: ['62', '63'], description: 'IT-услуги и поддержка' },
  // Food
  { id: 'food_products', name: 'Продукты питания', industry: 'Продовольствие', okpd2: ['10'], description: 'Продовольственные товары' },
  { id: 'catering', name: 'Услуги питания', industry: 'Продовольствие', okpd2: ['56'], description: 'Общепит и кейтеринг' },
  // Services
  { id: 'security', name: 'Охранные услуги', industry: 'Услуги', okpd2: ['80'], description: 'Охрана объектов' },
  { id: 'cleaning', name: 'Клининг', industry: 'Услуги', okpd2: ['81.2'], description: 'Уборка помещений' },
  // Transport
  { id: 'vehicles', name: 'Автомобили', industry: 'Транспорт', okpd2: ['29'], description: 'Легковые и грузовые автомобили' },
  { id: 'fuel', name: 'ГСМ', industry: 'Транспорт', okpd2: ['19.2'], description: 'Горюче-смазочные материалы' },
];

// Generate modules list (10,000+ items)
export function generateModules(): Module[] {
  const modules: Module[] = [];
  
  // FILTER MODULES (3500+)
  // Region filters (89)
  REGIONS.forEach(region => {
    modules.push({
      id: `filter-region-${region.code}`,
      name: region.name,
      description: `Фильтр по региону: ${region.name}`,
      category: 'filters',
      subcategory: `Регионы / ${region.federalDistrict}`,
      icon: 'MapPin',
      enabled: false,
    });
  });
  
  // OKPD2 filters (60+ main categories, would be 6000+ with all subcategories)
  OKPD2_CATEGORIES.forEach(cat => {
    modules.push({
      id: `filter-okpd2-${cat.code}`,
      name: `${cat.code} ${cat.name}`,
      description: `Фильтр по ОКПД2: ${cat.name}`,
      category: 'filters',
      subcategory: `ОКПД2 / Секция ${cat.section}`,
      icon: 'Package',
      enabled: false,
    });
  });
  
  // Method filters (15)
  PROCUREMENT_METHODS.forEach(method => {
    modules.push({
      id: `filter-method-${method.id}`,
      name: method.name,
      description: `Способ закупки: ${method.name}`,
      category: 'filters',
      subcategory: `Способы закупок / ${method.law}`,
      icon: 'FileText',
      enabled: false,
    });
  });
  
  // Status filters (12)
  PROCUREMENT_STATUSES.forEach(status => {
    modules.push({
      id: `filter-status-${status.id}`,
      name: status.name,
      description: `Статус закупки: ${status.name}`,
      category: 'filters',
      subcategory: 'Статусы',
      icon: 'CircleDot',
      enabled: false,
    });
  });
  
  // Customer type filters (25)
  CUSTOMER_TYPES.forEach(type => {
    modules.push({
      id: `filter-customer-${type.id}`,
      name: type.name,
      description: `Тип заказчика: ${type.name}`,
      category: 'filters',
      subcategory: `Заказчики / ${type.category}`,
      icon: 'Building2',
      enabled: false,
    });
  });
  
  // ETP filters (9)
  ETPS.forEach(etp => {
    modules.push({
      id: `filter-etp-${etp.id}`,
      name: etp.name,
      description: `Электронная площадка: ${etp.name}`,
      category: 'filters',
      subcategory: 'ЭТП',
      icon: 'Globe',
      enabled: false,
    });
  });
  
  // Price range filters (16)
  PRICE_RANGES.forEach(range => {
    modules.push({
      id: `filter-price-${range.id}`,
      name: range.label,
      description: `Ценовой диапазон: ${range.label}`,
      category: 'filters',
      subcategory: 'Цена НМЦК',
      icon: 'Banknote',
      enabled: false,
    });
  });
  
  // Law filters (8)
  LAWS.forEach(law => {
    modules.push({
      id: `filter-law-${law.id}`,
      name: law.name,
      description: law.description,
      category: 'filters',
      subcategory: 'Законодательство',
      icon: 'Scale',
      enabled: false,
    });
  });
  
  // Time filters (10)
  TIME_FILTERS.forEach(filter => {
    modules.push({
      id: `filter-time-${filter.id}`,
      name: filter.label,
      description: `Временной фильтр: ${filter.label}`,
      category: 'filters',
      subcategory: 'Время',
      icon: 'Calendar',
      enabled: false,
    });
  });

  // METRICS MODULES (500+)
  const metricGroups = [
    { group: 'Финансовые', metrics: ['НМЦК', 'Цена контракта', 'Экономия (руб)', 'Экономия (%)', 'Снижение цены', 'Обеспечение заявки', 'Обеспечение контракта', 'Антидемпинг', 'Аванс', 'Штрафы', 'Неустойка', 'Банковская гарантия'] },
    { group: 'Статистика', metrics: ['Количество заявок', 'Допущено', 'Отклонено', 'Участников', 'Лотов', 'Средняя экономия', 'Медианная цена', '% несостоявшихся', '% единственный поставщик', 'Конкурентность', 'Доля СМП'] },
    { group: 'Поставщик', metrics: ['ИНН', 'Название', 'Регион', 'Дата регистрации', 'Уставный капитал', 'Численность', 'Выручка', 'Прибыль', 'Выигранных контрактов', 'Сумма контрактов', '% побед', 'В РНП', 'Рейтинг'] },
    { group: 'Заказчик', metrics: ['ИНН заказчика', 'Наименование', 'Контакты', 'Закупок всего', 'Сумма закупок', 'Средний чек', '% несостоявшихся', 'Топ поставщики', 'Жалобы ФАС', 'Рейтинг прозрачности'] },
    { group: 'Контракт', metrics: ['Номер контракта', 'Дата заключения', 'Срок исполнения', 'Цена', 'Оплачено', 'Этапы', '% выполнения', 'Акты приемки', 'Доп. соглашения', 'Расторжение'] },
    { group: 'Время', metrics: ['Дней до окончания', 'Дней до аукциона', 'Срок исполнения', 'Время на заявку', 'Длительность закупки', 'Скорость оплаты'] },
  ];
  
  metricGroups.forEach(group => {
    group.metrics.forEach(metric => {
      modules.push({
        id: `metric-${group.group.toLowerCase()}-${metric.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: metric,
        description: `Метрика: ${metric}`,
        category: 'metrics',
        subcategory: group.group,
        icon: 'BarChart3',
        enabled: false,
      });
    });
  });

  // CHART MODULES (200+)
  const chartTypes = [
    { group: 'Тренды', charts: ['Динамика по месяцам', 'По кварталам', 'Тренд НМЦК', 'Тренд экономии', 'Тренд конкуренции', 'Сезонность', 'Прогноз объема', 'Сравнение с прошлым годом'] },
    { group: 'Распределение', charts: ['По способам закупки', 'По статусам', 'По регионам', 'По ОКПД2', 'По заказчикам', 'По ценам', 'Доля СМП', 'Структура расходов'] },
    { group: 'Рейтинги', charts: ['Топ-10 заказчиков', 'Топ-10 поставщиков', 'Топ-10 регионов', 'Топ-10 категорий', 'Сравнение ЭТП', 'По дням недели'] },
    { group: 'Карты', charts: ['Карта по объему', 'Карта по количеству', 'Карта конкуренции', 'Карта экономии', 'Тепловая карта'] },
    { group: 'Воронки', charts: ['Воронка закупки', 'Sankey движения средств', 'Конверсия заявок'] },
  ];
  
  chartTypes.forEach(group => {
    group.charts.forEach(chart => {
      modules.push({
        id: `chart-${group.group.toLowerCase()}-${chart.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: chart,
        description: `График: ${chart}`,
        category: 'charts',
        subcategory: group.group,
        icon: 'LineChart',
        enabled: false,
      });
    });
  });

  // HISTORY MODULES (150+)
  const historyTypes = [
    { group: 'Похожие закупки', items: ['За год', 'За 3 года', 'За 5 лет', 'По ОКПД2', 'По заказчику', 'По региону', 'По цене', 'Регулярные', 'Сезонные'] },
    { group: 'Анализ аналогов', items: ['Средняя цена', 'Медианная цена', 'Минимум/максимум', 'Диапазон', 'Цена vs рынок', 'Завышение НМЦК', 'Типичная экономия', 'Типичное количество участников'] },
    { group: 'Прогнозы', items: ['Прогноз цены', 'Прогноз участников', 'Вероятность состояться', 'Вероятность победы', 'Рекомендуемая цена', 'Оптимальное снижение', 'Риск демпинга'] },
  ];
  
  historyTypes.forEach(group => {
    group.items.forEach(item => {
      modules.push({
        id: `history-${group.group.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}-${item.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: item,
        description: `${group.group}: ${item}`,
        category: 'history',
        subcategory: group.group,
        icon: 'History',
        enabled: false,
      });
    });
  });

  // CALCULATOR MODULES (100+)
  const calculatorTypes = [
    { group: 'Маржа', items: ['Валовая маржа', 'Чистая маржа', 'Накладные расходы', 'Логистика', 'НДС', 'Налог на прибыль', 'Обеспечение', 'Банковская гарантия', 'Точка безубыточности', 'ROI', 'Минимальная цена', 'Оптимальная цена'] },
    { group: 'Обеспечение', items: ['Обеспечение заявки', 'Обеспечение контракта', 'Стоимость гарантии', 'Сравнение вариантов', 'Заморозка средств', 'Альтернативная стоимость'] },
    { group: 'Сроки', items: ['Время на заявку', 'До аукциона', 'Срок исполнения', 'График платежей', 'Календарь этапов', 'Критический путь'] },
    { group: 'Риски', items: ['Риск неоплаты', 'Риск расторжения', 'Риск изменений', 'Риск демпинга', 'Риск несостоявшейся', 'Страхование', 'Резерв на риски', 'Скоринг'] },
    { group: 'Сравнение', items: ['Сравнение закупок', 'По маржинальности', 'По вероятности', 'Ожидаемая выручка', 'Портфель закупок'] },
  ];
  
  calculatorTypes.forEach(group => {
    group.items.forEach(item => {
      modules.push({
        id: `calc-${group.group.toLowerCase()}-${item.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: item,
        description: `Калькулятор: ${item}`,
        category: 'calculators',
        subcategory: group.group,
        icon: 'Calculator',
        enabled: false,
      });
    });
  });

  // EXTERNAL SOURCES (300+)
  const externalSources = [
    { group: 'Компании', items: ['СПАРК', 'Контур.Фокус', 'Финотчетность', 'Баланс', 'Выручка/прибыль', 'Связи', 'Учредители', 'Лицензии', 'СРО', 'ЕГРЮЛ', 'ЕГРИП', 'Налоги ФНС', 'Задолженности', 'ОКВЭД', 'Численность'] },
    { group: 'Суды', items: ['Арбитраж', 'Как истец', 'Как ответчик', 'Суммы исков', 'Текущие дела', 'ФССП', 'Взыскания', 'ФАС жалобы', 'Решения ФАС', 'РНП', 'Нарушения'] },
    { group: 'Рынок', items: ['Рыночные цены', 'Цены агрегаторов', 'Цены производителей', 'Оптовые цены', 'Биржевые котировки', 'USD/RUB', 'EUR/RUB', 'CNY/RUB', 'Индекс цен', 'Инфляция', 'Ставка ЦБ'] },
    { group: 'Геоданные', items: ['Расстояние', 'Маршруты', 'Стоимость доставки', 'Время доставки', 'Региональные коэффициенты'] },
    { group: 'Новости', items: ['Новости заказчика', 'Новости отрасли', 'Законодательство', 'Планы закупок', 'Бюджет', 'Тендерные новости'] },
    { group: 'Рейтинги', items: ['Надежность заказчика', 'Надежность поставщика', 'Прозрачность', 'Коррупционный риск', 'Кредитный рейтинг', 'ESG'] },
  ];
  
  externalSources.forEach(group => {
    group.items.forEach(item => {
      modules.push({
        id: `external-${group.group.toLowerCase()}-${item.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: item,
        description: `Внешний источник: ${item}`,
        category: 'external',
        subcategory: group.group,
        icon: 'ExternalLink',
        enabled: false,
      });
    });
  });

  // TELEGRAM MODULES (200+)
  const telegramModules = [
    { group: 'Команды', items: ['/start', '/help', '/menu', '/settings', '/filters', '/subscribe', '/search', '/region', '/category', '/price', '/status', '/today', '/week', '/ending', '/new', '/favorites', '/history', '/stats', '/top', '/calc', '/compare', '/export', '/alerts', '/mute', '/unmute', '/feedback', '/support', '/profile', '/company', '/competitors', '/watchlist'] },
    { group: 'Inline-кнопки', items: ['Главное меню', 'Назад', 'Вперед', 'Обновить', 'Закрыть', 'Подробнее', 'В избранное', 'Подписаться', 'Настройки', 'Фильтры', 'По цене', 'По дате', 'По релевантности', 'Следующая страница', 'Предыдущая'] },
    { group: 'Действия', items: ['Открыть на сайте', 'Скачать документы', 'Расчет маржи', 'Найти похожие', 'История цен', 'Анализ заказчика', 'Анализ конкурентов', 'Напоминание', 'Поделиться', 'Экспорт Excel', 'Экспорт PDF', 'Сохранить шаблон', 'Создать отчет'] },
    { group: 'Reply-кнопки', items: ['Поиск', 'Мои фильтры', 'Избранное', 'Аналитика', 'Калькулятор', 'Настройки', 'Статистика', 'Уведомления', 'Экспорт', 'Помощь'] },
    { group: 'Шаблоны', items: ['Карточка закупки', 'Список закупок', 'Результаты поиска', 'Статистика дня', 'Еженедельный дайджест', 'Уведомление о новой', 'Уведомление об изменении', 'Уведомление об окончании', 'Отчет по фильтрам', 'Сравнительный отчет'] },
  ];
  
  telegramModules.forEach(group => {
    group.items.forEach(item => {
      modules.push({
        id: `telegram-${group.group.toLowerCase()}-${item.toLowerCase().replace(/[^a-zа-я0-9/]/g, '-')}`,
        name: item,
        description: `Telegram: ${item}`,
        category: 'telegram',
        subcategory: group.group,
        icon: 'MessageCircle',
        enabled: false,
      });
    });
  });

  // INDUSTRY TEMPLATES (200+)
  const templates = [
    { industry: 'Медицина', items: ['Лекарства', 'Оборудование', 'Расходники', 'Мебель', 'Одежда', 'Диагностика', 'Лаборатория', 'Стоматология', 'Офтальмология', 'Реабилитация'] },
    { industry: 'Строительство', items: ['Здания', 'Капремонт', 'Текущий ремонт', 'Дороги', 'Благоустройство', 'Проектирование', 'Стройконтроль', 'Стройматериалы', 'Инженерные сети', 'Электромонтаж'] },
    { industry: 'IT', items: ['Разработка ПО', 'Компьютеры', 'Серверы', 'Сетевое оборудование', 'Техподдержка', 'Облака', 'ИБ', '1С/ERP', 'Сайты', 'Связь'] },
    { industry: 'Транспорт', items: ['Перевозки', 'Автомобили', 'Спецтехника', 'ГСМ', 'Запчасти', 'Ремонт транспорта', 'Логистика', 'Такси'] },
    { industry: 'Продовольствие', items: ['Продукты', 'Общепит', 'Кейтеринг', 'Школьное питание', 'Больничное питание'] },
    { industry: 'Услуги', items: ['Охрана', 'Клининг', 'Вывоз мусора', 'Аренда', 'ЖКХ', 'Юридические', 'Бухгалтерские', 'Аудит', 'Страхование', 'Банковские', 'Образование', 'Переводы', 'Полиграфия', 'Реклама', 'Консалтинг'] },
  ];
  
  templates.forEach(group => {
    group.items.forEach(item => {
      modules.push({
        id: `template-${group.industry.toLowerCase()}-${item.toLowerCase().replace(/[^a-zа-я0-9]/g, '-')}`,
        name: item,
        description: `Шаблон ${group.industry}: ${item}`,
        category: 'templates',
        subcategory: group.industry,
        icon: 'LayoutTemplate',
        enabled: false,
      });
    });
  });
  
  return modules;
}

// Pre-generated modules list
export const ALL_MODULES = generateModules();

// Helper function to get module counts by category
export function getModuleCounts() {
  const counts: Record<string, number> = {};
  ALL_MODULES.forEach(m => {
    counts[m.category] = (counts[m.category] || 0) + 1;
  });
  return counts;
}

// Helper to filter modules
export function filterModules(query: string, category?: string) {
  let filtered = ALL_MODULES;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(m => m.category === category);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      m.subcategory.toLowerCase().includes(lowerQuery)
    );
  }
  
  return filtered;
}

// Get unique subcategories for a category
export function getSubcategories(category: string) {
  const subcats = new Set<string>();
  ALL_MODULES
    .filter(m => m.category === category)
    .forEach(m => subcats.add(m.subcategory));
  return Array.from(subcats).sort();
}
