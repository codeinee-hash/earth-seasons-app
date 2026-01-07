import { useEffect, useState } from 'react';
import { MONTHS } from '@/utils/months.const';
import { SEASONS } from '@/utils/seasons.const';

export const useAnimationSequence = () => {
  const [zoomCompleted, setZoomCompleted] = useState(false);
  const [orbitCompleted, setOrbitCompleted] = useState(false);
  const [currentSeason, setCurrentSeason] = useState(-1);
  const [seasonsCompleted, setSeasonsCompleted] = useState(false);
  const [visibleMonths, setVisibleMonths] = useState(0);
  const [monthNameStep, setMonthNameStep] = useState(-1);

  const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

  useEffect(() => {
    if (visibleMonths === MONTHS.length) {
      const timer = setTimeout(() => setMonthNameStep(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleMonths]);

  useEffect(() => {
    if (monthNameStep < 0 || monthNameStep >= displayOrder.length) return;
    const timer = setTimeout(() => setMonthNameStep(monthNameStep + 1), 800);
    return () => clearTimeout(timer);
  }, [monthNameStep]);

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

  return {
    orbitCompleted,
    setOrbitCompleted,
    zoomCompleted,
    setZoomCompleted,
    currentSeason,
    seasonsCompleted,
    visibleMonths,
    monthNameStep,
  };
};
