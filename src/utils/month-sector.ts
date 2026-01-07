export type SectorGeometry = {
  d: string;
  textX: number;
  textY: number;
};

const CENTER_X = 200;
const CENTER_Y = 200;
const INNER_RADIUS = 128;
const OUTER_RADIUS = 180;

export function getMonthSectorGeometry(monthIndex: number): SectorGeometry {
  const startAngle = monthIndex * 30 - 90;
  const endAngle = startAngle + 30;

  const x1 = CENTER_X + INNER_RADIUS * Math.cos((startAngle * Math.PI) / 180);
  const y1 = CENTER_Y + INNER_RADIUS * Math.sin((startAngle * Math.PI) / 180);
  const x2 = CENTER_X + OUTER_RADIUS * Math.cos((startAngle * Math.PI) / 180);
  const y2 = CENTER_Y + OUTER_RADIUS * Math.sin((startAngle * Math.PI) / 180);
  const x3 = CENTER_X + OUTER_RADIUS * Math.cos((endAngle * Math.PI) / 180);
  const y3 = CENTER_Y + OUTER_RADIUS * Math.sin((endAngle * Math.PI) / 180);
  const x4 = CENTER_X + INNER_RADIUS * Math.cos((endAngle * Math.PI) / 180);
  const y4 = CENTER_Y + INNER_RADIUS * Math.sin((endAngle * Math.PI) / 180);

  const d = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;

  const textAngle = startAngle + 15;
  const textRadius = (INNER_RADIUS + OUTER_RADIUS) / 2;
  const textX = CENTER_X + textRadius * Math.cos((textAngle * Math.PI) / 180);
  const textY = CENTER_Y + textRadius * Math.sin((textAngle * Math.PI) / 180);

  return { d, textX, textY };
}

export const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const seasonBgColors = {
  winter: '#B9E6FF',
  spring: '#FFCCDD',
  summer: '#8EFF9D',
  autumn: '#FFBE60',
};

export const seasonColors = {
  winter: '#00A4FF',
  spring: '#FF77AD',
  summer: '#26E83F',
  autumn: '#F68A00',
};
