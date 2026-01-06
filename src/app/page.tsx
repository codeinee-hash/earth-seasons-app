'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { Sun } from '@/components/sun';
import { SEASONS } from '@/lib/seasons.const';

export default function Home() {
  const [zoomCompleted, setZoomCompleted] = useState(false);
  const [orbitCompleted, setOrbitCompleted] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(-1);

  const sunControls = useAnimationControls();

  useEffect(() => {
    if (!zoomCompleted) return;

    const timer = setTimeout(() => setCurrentSeason(0), 600);
    return () => clearTimeout(timer);
  }, [zoomCompleted]);

  useEffect(() => {
    if (currentSeason < 0 || currentSeason >= SEASONS.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentSeason(currentSeason + 1);
    }, 2200);

    return () => clearTimeout(timer);
  }, [currentSeason]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black overflow-hidden">
      <div className="relative w-[400px] h-[400px]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={sunControls}
        >
          <Sun />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: 'linear', repeat: 0 }}
          onAnimationComplete={() => {
            setOrbitCompleted(true);
            sunControls.start({ opacity: 0, transition: { duration: 1.5 } });
          }}
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
            onAnimationComplete={() => orbitCompleted && setZoomCompleted(true)}
          >
            <Image
              src="/images/earth.png"
              alt="Earth base"
              width={400}
              height={400}
              className="rounded-full drop-shadow-2xl absolute inset-0"
            />

            {zoomCompleted && (
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
            )}
          </motion.div>
        </motion.div>

        {zoomCompleted && currentSeason >= 0 && currentSeason < SEASONS.length && (
          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <motion.div
              key={SEASONS[currentSeason].name}
              className="text-4xl font-bold text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {SEASONS[currentSeason].name}
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
