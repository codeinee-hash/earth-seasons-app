import { motion } from 'framer-motion';
import { MONTHS } from '@/utils/months.const';
import {
  displayOrder,
  getMonthSectorGeometry,
  seasonBgColors,
  seasonColors,
} from '@/utils/month-sector';

interface Props {
  seasonsCompleted: boolean;
  visibleMonths: number;
  monthNameStep: number;
}

export function MonthsRing({ seasonsCompleted, visibleMonths, monthNameStep }: Props) {
  if (!seasonsCompleted) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
      {MONTHS.map((month, monthIndex) => {
        const animIndex = displayOrder.indexOf(month.number);
        const { d, textX, textY } = getMonthSectorGeometry(monthIndex);

        const isVisible = visibleMonths > animIndex;
        const isNameShown = monthNameStep > animIndex;

        return (
          <g key={month.number}>
            <motion.path
              d={d}
              fill={seasonBgColors[month.season]}
              stroke={seasonColors[month.season]}
              strokeWidth="3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            <motion.text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-900 text-2xl font-bold"
              animate={{ opacity: isVisible && !isNameShown ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {month.number}
            </motion.text>

            <motion.text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-[${seasonColors[month.season]}] text-sm font-semibold`}
              animate={{ opacity: isNameShown ? 1 : 0, scale: isNameShown ? 1 : 0.8 }}
              transition={{ duration: 0.6 }}
            >
              {month.text}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
