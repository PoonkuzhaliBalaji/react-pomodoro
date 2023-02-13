import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { completion } from '../constants/textConstants';
import commonStyles from '../main.module.css';
import styles from './taskCompletion.module.css';

const TaskCompletion = () => {
  const formik = useFormik({
    initialValues: {
      number: ''
    },
    onSubmit: () => {}
  });

  const PerformanceTrack = useCallback((percentage: number) => {
    if(percentage === 0) {
      return completion.null
    }
    else if (percentage > 0 && percentage <= 50) {
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

  const { number } = formik.values;
  const totalTasks = 10; // TODO: Take from db length
  const completionPercentage = (+number / totalTasks) * 100;

  // TODO: Display table with checkboxes

  return (
    <div className={commonStyles.container}>
      <Header />
      {number === '' && <div className={styles.noOfCompletion}>
        <p>{completion.noOfCompleted}</p>
      </div>}
      {number !== '' && <div className={styles.completion}>
        <p>{completion.title}</p>
        <p className={styles.percentage}>{completionPercentage} %</p>
        <p className={styles.comments}>{PerformanceTrack(completionPercentage)}</p>
        <Link to="/todo_list">
          <Button type="ghost" className="primarylink">
            {completion.redirectToDo}
          </Button>
        </Link>
      </div>}
    </div>
  );
};

export default TaskCompletion;
