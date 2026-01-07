'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { Sun } from '@/components/sun';
import { OrbitEarth } from '@/components/orbit-earth';
import { SeasonsOverlay } from '@/components/seasons-overlay';
import { MonthsRing } from '@/components/months-ring';
import { useAnimationSequence } from '@/hooks/use-animation-sequence';

export default function Home() {
  const {
    orbitCompleted,
    setOrbitCompleted,
    zoomCompleted,
    setZoomCompleted,
    currentSeason,
    seasonsCompleted,
    visibleMonths,
    monthNameStep,
  } = useAnimationSequence();

  const sunControls = useAnimationControls();

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative w-[500px] h-[500px]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={sunControls}
        >
          <Sun />
        </motion.div>

        <OrbitEarth
          orbitCompleted={orbitCompleted}
          onOrbitComplete={() => {
            setOrbitCompleted(true);
            sunControls.start({ opacity: 0, transition: { duration: 1.5 } });
          }}
          onZoomComplete={() => orbitCompleted && setZoomCompleted(true)}
        >
          <SeasonsOverlay
            zoomCompleted={zoomCompleted}
            currentSeason={currentSeason}
            seasonsCompleted={seasonsCompleted}
          />
        </OrbitEarth>

        <MonthsRing
          seasonsCompleted={seasonsCompleted}
          visibleMonths={visibleMonths}
          monthNameStep={monthNameStep}
        />
      </div>
    </main>
  );
}
