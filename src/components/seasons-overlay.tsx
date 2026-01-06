import { motion } from 'framer-motion';

const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];

export function SeasonsOverlay() {
  return (
    <div className="absolute top-20">
      {seasons.map((season, index) => (
        <motion.div
          key={season}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 1, duration: 0.5 }}
          className="text-xl font-bold mb-2"
        >
          {season}
        </motion.div>
      ))}
    </div>
  );
}
