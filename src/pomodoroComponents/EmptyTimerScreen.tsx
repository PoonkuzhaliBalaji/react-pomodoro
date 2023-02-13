import { Header } from '../components/Header';
import TimerComponent from './TimerComponent';
import commonStyles from '../main.module.css';
import { TimerContext } from '../components/Timer';
import { timerText } from '../constants/textConstants';
import styles from './emptyTimerScreen.module.css';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmptyTimerScreen = () => {
  const { timer } = useContext(TimerContext);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
  const query = useQuery();
  const passedTime = query.get('timer');
  const contantContrationTime = 1500; // 25 min * 60
  const timeToRedirect = passedTime ? +passedTime - contantContrationTime : 0;

  useEffect(() => {
    if(timeToRedirect === timer) {
        navigate(`/quote_generator?timer=${timer}`);
    }
  },[passedTime, contantContrationTime, timeToRedirect, timer]);

  return (
    <div className={commonStyles.container}>
      <Header />
      <TimerComponent timer={timer} />
      <h2 className={styles.timerLeftStyle}>{timerText.leftTime}</h2>
    </div>
  );
};

export default EmptyTimerScreen;
