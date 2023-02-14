import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { completion } from '../constants/textConstants';
import commonStyles from '../main.module.css';
import styles from './taskCompletion.module.css';
import { useIndexedDB } from 'react-indexed-db';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface TaskList {
  task: string;
  id: number;
}
const TaskCompletion = () => {
  const navigate = useNavigate();
  const db = useIndexedDB('tasks');
  const [taskList, setTaskList] = useState<TaskList[]>([]);

  const [openPercentage, setOpenPercentage] = useState(false);
  const formik = useFormik({
    initialValues: {
      number: 0
    },
    onSubmit: () => {}
  });

  const PerformanceTrack = useCallback((percentage: number) => {
    if (percentage === 0) {
      return completion.null;
    } else if (percentage > 0 && percentage <= 50) {
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

  db.getAll().then((tasks: TaskList[]) => {
    setTaskList(tasks);
  });
  const completionPercentage = (number / taskList.length) * 100;

  const checkFinishedTasks = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked === true) {
        formik.setFieldValue('number', number + 1);
      } else {
        formik.setFieldValue('number', number - 1);
      }
    },
    [number]
  );

  const closeTask = () => {
    db.clear();
    navigate(`/todo_list`);
  };
  return (
    <div className={commonStyles.container}>
      <Header />
      {!openPercentage && (
        <div className={styles.noOfCompletion}>
          <p>{completion.noOfCompleted}</p>
          <div>
            {taskList.map((item: TaskList, index) => {
              return (
                <div className={styles.taskListDisplay} key={`task_${index}`}>
                  <Checkbox
                    onChange={checkFinishedTasks}
                    style={{ marginTop: 20, marginRight: 20 }}></Checkbox>
                  <p>{item.task}</p>
                </div>
              );
            })}
          </div>
          <Button type="ghost" onClick={() => setOpenPercentage(true)}>
            {completion.checkPercentage}
          </Button>
        </div>
      )}
      {openPercentage && (
        <div className={styles.completion}>
          <p>{completion.title}</p>
          <p className={styles.percentage}>{completionPercentage} %</p>
          <p className={styles.comments}>{PerformanceTrack(completionPercentage)}</p>

          <Button type="ghost" className="primarylink" onClick={closeTask}>
            {completion.redirectToDo}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskCompletion;
