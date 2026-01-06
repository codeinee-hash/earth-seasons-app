import { motion } from 'framer-motion';
import Image from 'next/image';
import { Seasons } from '@/components/seasons';
import { Months } from '@/components/months';

interface Props {
  orbitCompleted: boolean;
  zoomCompleted: boolean;
  seasonsCompleted: boolean;
  monthsCompleted: boolean;
  onZoomComplete: () => void;
  onSeasonsComplete: () => void;
  onMonthsComplete: () => void;
}

export function Earth({
  orbitCompleted,
  zoomCompleted,
  seasonsCompleted,
  onSeasonsComplete,
  monthsCompleted,
  onZoomComplete,
  onMonthsComplete,
}: Props) {
  // большая Земля с 4 секторами и деревьями
  return (
    <motion.div
      className="absolute w-20 h-20" // Маленькая сначала
      style={{
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        transformOrigin: 'center 200px',
      }}
      animate={{
        scale: orbitCompleted ? 5 : 1,
        top: orbitCompleted ? '50%' : 0,
        y: orbitCompleted ? '-50%' : 0,
      }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      onAnimationComplete={onZoomComplete}
    >
      <Image src="/images/earth.png" alt="Earth" width={80} height={80} className="rounded-full" />
      {zoomCompleted && <Seasons onComplete={onSeasonsComplete} />}
      {seasonsCompleted && (
        <Months onComplete={onMonthsComplete} monthsCompleted={monthsCompleted} />
      )}
    </motion.div>
  );
}
