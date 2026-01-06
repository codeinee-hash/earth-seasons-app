import { motion } from 'framer-motion';
import type { MonthData } from '@/lib/months.data';

const seasonBorders = {
  winter: 'border-blue-500',
  spring: 'border-green-500',
  summer: 'border-red-500',
  autumn: 'border-orange-500',
};

interface Props {
  month: MonthData;
  animateName: boolean;
}

export function MonthCard({ month, animateName }: Props) {
  return (
    <div className={`w-16 h-16 border-2 ${seasonBorders[month.season]} rounded-md flex center`}>
      <motion.span animate={animateName ? { x: 20, color: 'white', opacity: 0 } : {}}>
        {month.number}
      </motion.span>
      {animateName && (
        <motion.span
          initial={{ y: -20, scale: 1.5 }}
          animate={{ y: 0, scale: 1, color: 'darkblue' }}
        >
          {month.text}
        </motion.span>
      )}
    </div>
  );
}
