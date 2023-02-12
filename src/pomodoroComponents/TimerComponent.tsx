import { useCallback } from 'react';
import styles from './timerComponent.module.css';

interface TimerComponentPropType {
    timer: number
}

const TimerComponent = ({ timer } : TimerComponentPropType) => {
  const formatTime = useCallback((time: number) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }, []);

  const getTimeInHrsMinsAndSecs = useCallback(
    (time: number) => {
      let hours = Math.floor(time / 3600);
      let formattedSeconds = time % 3600;
      let minutes = Math.floor(formattedSeconds / 60);
      let seconds = formattedSeconds % 60;

      return `${formatTime(hours)}: ${formatTime(minutes)}: ${formatTime(seconds)}`;
    },
    [formatTime]
  );

  const styleOfTimer = timer <= 300 ? styles.alertTimer: styles.timerContainer;

  return (
    <div className={styleOfTimer}>
        {getTimeInHrsMinsAndSecs(timer)}
    </div>
  )
};

export default TimerComponent;
