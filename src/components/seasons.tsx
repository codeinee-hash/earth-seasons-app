'use client';

import { useState, useEffect } from 'react';
import { SEASONS } from '@/lib/seasons.const';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  onComplete: () => void;
}

export function Seasons({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < SEASONS.length) {
      const timer = setTimeout(() => setCurrent(current + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [current, onComplete]);

  return (
    <div className="relative w-full h-full">
      {SEASONS.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={s.image}
            alt={s.name}
            width={400}
            height={400}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
      ))}
      <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl font-bold">
        {SEASONS[current]?.name}
      </motion.div>
    </div>
  );
}
