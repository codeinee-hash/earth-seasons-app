export type MonthData = {
  number: number;
  text: string;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
};

export const monthsData: MonthData[] = [
  { number: 12, text: 'Декабрь', season: 'winter' },
  { number: 1, text: 'Январь', season: 'winter' },
  { number: 2, text: 'Февраль', season: 'winter' },
  { number: 3, text: 'Март', season: 'spring' },
  { number: 4, text: 'Апрель', season: 'spring' },
  { number: 5, text: 'Май', season: 'spring' },
  { number: 6, text: 'Июнь', season: 'summer' },
  { number: 7, text: 'Июль', season: 'summer' },
  { number: 8, text: 'Август', season: 'summer' },
  { number: 9, text: 'Сентябрь', season: 'autumn' },
  { number: 10, text: 'Октябрь', season: 'autumn' },
  { number: 11, text: 'Ноябрь', season: 'autumn' },
];
