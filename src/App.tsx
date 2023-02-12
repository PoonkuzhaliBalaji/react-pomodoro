import { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TimerContext, useInterval } from './components/Timer';
import MainComponent from './MainComponent';
import QuoteGenerator from './pomodoroComponents/QuoteGenerator';
import TaskCompletion from './pomodoroComponents/TaskCompletion';
import TodoList from './pomodoroComponents/TodoList';

const App = () => {
  const [timer, setTimer] = useState(0);

  const setInitialTimer = useCallback((timer: number) => {
    setTimer(timer);
  },[setTimer]);

  useInterval(() => {
    if(timer > 0) {
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
        <Route path="quote_generator" element={<QuoteGenerator />} />
        <Route path="completion_percentage" element={<TaskCompletion />} />
      </Routes>
    </TimerContext.Provider>
  );
};

export default App;
