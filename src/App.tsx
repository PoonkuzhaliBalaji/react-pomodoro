import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TimerContext, useInterval } from './components/Timer';
import MainComponent from './MainComponent';
import EmptyTimerScreen from './pomodoroComponents/EmptyTimerScreen';
import QuoteGenerator from './pomodoroComponents/QuoteGenerator';
import TaskCompletion from './pomodoroComponents/TaskCompletion';
import TodoList from './pomodoroComponents/TodoList';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { DbConfig } from './Database/dbConfig';
import { libraryList } from './constants/libraryList';

initDB(DbConfig);

const App = () => {
  const quoteDb = useIndexedDB('quotes');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    quoteDb.clear();
    libraryList.map((item) => {
      const objectToStore = {
        quote: item
      };
      quoteDb.add(objectToStore).then(
        () => {},
        (error) => {
          console.log('Initial quote list not added', error);
        }
      );
    });
  }, [libraryList]);

  const setInitialTimer = useCallback(
    (timer: number) => {
      setTimer(timer);
    },
    [setTimer, timer]
  );

  useInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);

  return (
    <TimerContext.Provider
      value={{
        timer,
        setInitialTimer
      }}>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="todo_list" element={<TodoList />} />
        <Route path="working" element={<EmptyTimerScreen />} />
        <Route path="quote_generator" element={<QuoteGenerator />} />
        <Route path="completion_percentage" element={<TaskCompletion />} />
      </Routes>
    </TimerContext.Provider>
  );
};

export default App;
