import { createContext, useContext, useRef, useEffect } from 'react';

interface TimerContextPropType {
  timer: number;
  setInitialTimer: (arg1: number) => void;
}

export const TimerContext = createContext<TimerContextPropType>({
  timer: 0,
  setInitialTimer: () => {}
});

export function useTimer() {
  return useContext(TimerContext);
}

export function useInterval(callback: Function, delay: number) {
  const savedTimerCallback = useRef<any>(null);

  useEffect(() => {
    savedTimerCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedTimerCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
