'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { Sun } from '@/components/sun';
import { SEASONS } from '@/lib/seasons.const';
import { MONTHS } from '@/lib/months.data';

export default function Home() {
  const [zoomCompleted, setZoomCompleted] = useState(false);
  const [orbitCompleted, setOrbitCompleted] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(-1);
  const [seasonsCompleted, setSeasonsCompleted] = useState(false);
  const [visibleMonths, setVisibleMonths] = useState(0); // сколько ячеек уже появилось
  // const [monthNamesAnimating, setMonthNamesAnimating] = useState(false);
  // const [currentNameIndex, setCurrentNameIndex] = useState(-1);

  const sunControls = useAnimationControls();

  useEffect(() => {
    if (!zoomCompleted) return;
    const timer = setTimeout(() => setCurrentSeason(0), 600);
    return () => clearTimeout(timer);
  }, [zoomCompleted]);

  useEffect(() => {
    if (currentSeason < 0 || currentSeason >= SEASONS.length - 1) return;
    const timer = setTimeout(() => setCurrentSeason(currentSeason + 1), 2200);
    return () => clearTimeout(timer);
  }, [currentSeason]);

  useEffect(() => {
    if (currentSeason === SEASONS.length - 1) {
      const timer = setTimeout(() => {
        setSeasonsCompleted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSeason]);

  useEffect(() => {
    if (!seasonsCompleted) return;

    const timer = setInterval(() => {
      setVisibleMonths((prev) => {
        if (prev < MONTHS.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [seasonsCompleted]);

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative w-[500px] h-[500px]">
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

        {seasonsCompleted && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            {(() => {
              const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
              return displayOrder.map((displayNum, animIndex) => {
                const monthIndex = MONTHS.findIndex((m) => m.number === displayNum);
                const month = MONTHS[monthIndex];

                const startAngle = monthIndex * 30 - 90;
                const endAngle = startAngle + 30;
                const innerRadius = 128;
                const outerRadius = 180;

                const x1 = 200 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 200 + innerRadius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 200 + outerRadius * Math.cos((startAngle * Math.PI) / 180);
                const y2 = 200 + outerRadius * Math.sin((startAngle * Math.PI) / 180);
                const x3 = 200 + outerRadius * Math.cos((endAngle * Math.PI) / 180);
                const y3 = 200 + outerRadius * Math.sin((endAngle * Math.PI) / 180);
                const x4 = 200 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                const y4 = 200 + innerRadius * Math.sin((endAngle * Math.PI) / 180);

                const d = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;

                const textAngle = startAngle + 15;
                const textRadius = (innerRadius + outerRadius) / 2;
                const textX = 200 + textRadius * Math.cos((textAngle * Math.PI) / 180);
                const textY = 200 + textRadius * Math.sin((textAngle * Math.PI) / 180);

                const seasonBorderColors = {
                  winter: '#00A4FF',
                  spring: '#FF77AD',
                  summer: '#26E83F',
                  autumn: '#F68A00',
                };

                const seasonBgColors = {
                  winter: '#B9E6FF',
                  spring: '#FFCCDD',
                  summer: '#8EFF9D',
                  autumn: '#FFBE60',
                };

                return (
                  <motion.g
                    key={displayNum}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: visibleMonths > animIndex ? 1 : 0,
                      scale: visibleMonths > animIndex ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`border border-[${seasonBorderColors[month.season]}`}
                  >
                    <path
                      d={d}
                      fill={seasonBgColors[month.season]}
                      stroke={seasonBorderColors[month.season]
                        .replace('border-', '#')
                        .replace('400', '600')}
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-gray-900 text-2xl font-bold"
                    >
                      {displayNum}
                    </text>
                  </motion.g>
                );
              });
            })()}
          </svg>
        )}

        {zoomCompleted &&
          currentSeason >= 0 &&
          currentSeason < SEASONS.length &&
          !seasonsCompleted && (
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
