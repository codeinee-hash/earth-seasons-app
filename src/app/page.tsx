'use client';

import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { Sun } from '@/components/sun';

export default function Home() {
  const [zoomStarted, setZoomStarted] = useState(false);
  const sunControls = useAnimationControls();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black overflow-hidden">
      <div className="relative w-[350px] h-[350px]">
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
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: 0,
          }}
          onAnimationComplete={() => {
            setZoomStarted(true);
            sunControls.start({ opacity: 0, scale: 0.8, transition: { duration: 1.5 } });
          }}
        >
          <motion.div
            className="absolute w-[60px] h-[60px]"
            style={{
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              transformOrigin: 'center 200px',
            }}
            animate={
              zoomStarted
                ? {
                    scale: 4.5,
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    transformOrigin: 'center center',
                  }
                : {}
            }
            transition={{
              duration: 2,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/images/earth.png"
              alt="Earth"
              width={60}
              height={60}
              className="rounded-full drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
