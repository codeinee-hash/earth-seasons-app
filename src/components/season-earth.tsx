import { motion } from 'framer-motion';

export function SeasonEarth({ step }: { step: number }) {
  // большая Земля с 4 секторами и деревьями
  return (
    <motion.div
      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs"
      animate={{
        rotate: step >= 1 ? 360 : 0,
        scale: step >= 2 ? 2 : 1,
        x: [0, 100, 0, -100, 0], // Простая симуляция орбиты
        y: [0, 0, 100, 0, -100],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
        scale: { duration: 1, repeat: 0 },
      }}
    >
      Земля
    </motion.div>
  );
}
