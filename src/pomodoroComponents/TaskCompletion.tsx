import { useCallback } from 'react';
import { Header } from '../components/Header';
import { completion } from '../constants/textConstants';
import commonStyles from '../main.module.css';
import styles from './taskCompletion.module.css';

const TaskCompletion = () => {
  const PerformanceTrack = useCallback((percentage: number) => {
    if (percentage > 0 && percentage <= 50) {
      return completion.per1;
    } else if (percentage > 50 && percentage <= 70) {
      return completion.per2;
    } else if (percentage > 70 && percentage <= 85) {
      return completion.per3;
    } else if (percentage > 85 && percentage <= 99) {
      return completion.per4;
    } else if (percentage === 100) {
      return completion.per5;
    }
  }, []);

  return (
    <div className={commonStyles.container}>
      <Header />
      <div className={styles.completion}>
        <p>{completion.title}</p>
        <p className={styles.percentage}>100 %</p>
        <p className={styles.comments}>{PerformanceTrack(100)}</p>
      </div>
    </div>
  );
};

export default TaskCompletion;
