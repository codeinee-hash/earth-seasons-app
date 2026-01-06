import { motion } from 'framer-motion';
import { monthsData, type MonthData } from '@/lib/months-data';

const seasonColors: Record<MonthData['season'], string> = {
  winter: 'border-blue-500',
  spring: 'border-green-500',
  summer: 'border-red-500',
  autumn: 'border-orange-500',
};

export function MonthsTimeline({ animateNames }: { animateNames: boolean }) {
  return (
    <div className="absolute bottom-20 flex space-x-4">
      {monthsData.map((month, index) => (
        <motion.div
          key={month.number}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className={`w-20 h-20 border-2 ${seasonColors[month.season]} flex items-center justify-center rounded-md bg-gray-800`}
        >
          <motion.span
            initial={{ color: '#fff' }}
            animate={animateNames ? { x: 50, color: '#fff', scale: 0.5, opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {month.number}
          </motion.span>
          {animateNames && (
            <motion.span
              initial={{ y: -50, scale: 1.5, color: '#fff', opacity: 0 }}
              animate={{ y: 0, scale: 1, color: '#00008b', opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              {month.text}
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
