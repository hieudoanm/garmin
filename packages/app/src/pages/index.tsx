import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

const useClock = () => {
  const [state, setState] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setState(() => {
        const d = new Date();

        return {
          hours: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds(),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { hours: state.hours, minutes: state.minutes, seconds: state.seconds };
};

const Dot: FC = () => {
  const { hours, minutes, seconds } = useClock();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="relative flex aspect-square w-md items-center justify-center rounded-full border shadow-2xl">
        {/* HOURS */}
        <div
          className="absolute h-full w-full"
          style={{ transform: `rotate(${hourAngle}deg)` }}>
          <div className="bg-base-content absolute top-10 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full" />
        </div>

        {/* MINUTES */}
        <div
          className="absolute h-full w-full"
          style={{ transform: `rotate(${minuteAngle}deg)` }}>
          <div className="bg-base-content absolute top-8 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full" />
        </div>

        {/* SECONDS */}
        <div
          className="absolute h-full w-full"
          style={{ transform: `rotate(${secondAngle}deg)` }}>
          <div className="bg-base-content absolute top-6 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const Minimal: FC = () => {
  const { hours, minutes, seconds } = useClock();

  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <div className="flex aspect-square w-md items-center justify-center rounded-full border shadow-2xl">
        <p className="text-4xl">{addZero(hours)}</p>
        <p className="text-4xl">:</p>
        <p className="text-4xl">{addZero(minutes)}</p>
        <p className="text-4xl">:</p>
        <p className="text-4xl">{addZero(seconds)}</p>
      </div>
    </section>
  );
};

const HomePage: NextPage = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          break;
        case 'ArrowUp':
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
          break;
        case 'ArrowRight':
          window.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
          break;
        case 'ArrowLeft':
          window.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
          break;
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="container" className="h-screen w-screen">
      <Dot />
      <Minimal />
    </div>
  );
};

export default HomePage;
