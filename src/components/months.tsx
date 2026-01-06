'use client';

import { useState, useEffect } from 'react';
import { monthsData } from '@/lib/months.data';
import { motion } from 'framer-motion';
import { MonthCard } from '@/components/month-card';

interface Props {
  onComplete: () => void;
  monthsCompleted: boolean;
}

export function Months({ onComplete, monthsCompleted }: Props) {
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    // Появление ячеек поочерёдно
    setTimeout(onComplete, monthsData.length * 200 + 1000); // После всех
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {monthsData.map((m, i) => (
        <motion.div
          key={m.number}
          className="absolute" // Позиционируй по кругу (используй math для углов)
          style={{ transform: `rotate(${i * 30}deg) translate(150px)` }} // Круглый layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
        >
          <MonthCard month={m} animateName={monthsCompleted} />
        </motion.div>
      ))}
    </motion.div>
  );
}
