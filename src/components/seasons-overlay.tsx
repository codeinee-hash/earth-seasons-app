import { SEASONS } from '@/utils/seasons.const';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  zoomCompleted: boolean;
  currentSeason: number;
  seasonsCompleted: boolean;
}

export function SeasonsOverlay({ zoomCompleted, currentSeason, seasonsCompleted }: Props) {
  if (!zoomCompleted) return null;

  return (
    <>
      <div className="absolute inset-0">
        {SEASONS.map((season, index) => (
          <motion.div
            key={season.name}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: currentSeason >= index ? 1 : 0,
              scale: currentSeason >= index ? 1 : 0.9,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Image
              src={season.image}
              alt={season.name}
              width={400}
              height={400}
              className="rounded-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {currentSeason >= 0 && currentSeason < SEASONS.length && !seasonsCompleted && (
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <motion.div
            key={SEASONS[currentSeason].name}
            className="text-xl font-bold text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {SEASONS[currentSeason].name}
          </motion.div>
        </div>
      )}
    </>
  );
}
