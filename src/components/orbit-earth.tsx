import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  orbitCompleted: boolean;
  onOrbitComplete: () => void;
  onZoomComplete: () => void;
  children: React.ReactNode;
}

export function OrbitEarth({ orbitCompleted, onOrbitComplete, onZoomComplete, children }: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, ease: 'linear', repeat: 0 }}
      onAnimationComplete={onOrbitComplete}
    >
      <motion.div
        className="absolute w-[80px] h-[80px]"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          transformOrigin: 'center center',
        }}
        animate={{
          scale: orbitCompleted ? 4 : 1,
          top: orbitCompleted ? '50%' : 0,
          left: '50%',
          x: orbitCompleted ? '-50%' : '-50%',
          y: orbitCompleted ? '-50%' : 0,
        }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
        onAnimationComplete={onZoomComplete}
      >
        <Image
          src="/images/earth.png"
          alt="Earth"
          width={400}
          height={400}
          className="rounded-full drop-shadow-2xl absolute inset-0"
        />

        {children}
      </motion.div>
    </motion.div>
  );
}
