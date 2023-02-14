import commonStyles from '../main.module.css';
import styles from './todolist.module.css';
import { Formik, FieldArray } from 'formik';
import { useCallback, useContext } from 'react';
import { Select, Input, message } from 'antd';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { todo } from '../constants/textConstants';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../components/Timer';
import { useIndexedDB } from 'react-indexed-db';


interface FormInitialValueType {
  tasks: string[];
  hours: string;
}

interface AddTaskPropType {
  addTask: Function;
  removeTask: Function;
  taskIndex: number;
  handleChange: Function;
  task: string;
}

const formInitialValues: FormInitialValueType = {
  tasks: [''],
  hours: '2'
};

const hourOptions = [
  {
    label: '1 hour',
    value: '1'
  },
  {
    label: '2 hours',
    value: '2'
  },
  {
    label: '3 hours',
    value: '3'
  },
  {
    label: '4 hours',
    value: '4'
  }
];

const AddTask = ({ addTask, removeTask, taskIndex, handleChange, task }: AddTaskPropType) => {
  const removeSection = useCallback(() => {
    if (taskIndex === 0) {
      message.warning('You should proceed with atleast 1 task');
      return;
    } else {
      removeTask(taskIndex);
    }
  }, [removeTask, taskIndex]);

  return (
    <div className={styles.addTaskSection}>
      <Input
        placeholder={`Task ${taskIndex + 1}`}
        onChange={handleChange(`tasks[${taskIndex}]`)}
        value={task}
      />
      <Button type="ghost" onClick={() => addTask(taskIndex)} className="primarylink">
        Add Task
      </Button>
      <Button type="ghost" onClick={removeSection} className="secondarylink">
        Remove Task
      </Button>
    </div>
  );
};

const TodoList = () => {
  const navigate = useNavigate();
  const { setInitialTimer } = useContext(TimerContext);

  const db = useIndexedDB('tasks');

  const createListAndStartTimer = useCallback(
    (values: FormInitialValueType) => {
      const { hours, tasks } = values;
      if (tasks[0] === '') {
        message.warning('You need atleast a task to start working');
      } else {
        tasks.map((item) => {
          const obj = {
            task: item
          }
          db.add(obj).then(() => {
            message.success('Task list created');
          })
        })
        setInitialTimer(+hours * 3600);
        navigate(`/working?timer=${+hours * 3600}`);
      }
    },
    [navigate]
  );

  return (
    <div className={commonStyles.container}>
      <Header />
      <Formik initialValues={formInitialValues} onSubmit={() => {}}>
        {({ values, handleChange }) => {
          return (
            <>
              <div className={styles.title}>
                <h3>{todo.hourTitle}</h3>
                <Select
                  onChange={handleChange('hours')}
                  options={hourOptions}
                  value={values.hours}
                  className={styles.selectTag}
                />
              </div>
              <h3 className={styles.title}>{`${todo.title} ${values.hours} hour(s)`}</h3>
              <FieldArray name={'tasks'}>
                {({ insert, remove }) =>
                  values.tasks.map((task, taskIndex) => {
                    return (
                      <AddTask
                        addTask={insert}
                        removeTask={remove}
                        taskIndex={taskIndex}
                        handleChange={handleChange}
                        task={task}
                      />
                    );
                  })
                }
              </FieldArray>
              <div id="start_timer_button" className={styles.buttonContainer}>
                <Button type="ghost" onClick={() => createListAndStartTimer(values)}>
                  {todo.buttonText}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default TodoList;
