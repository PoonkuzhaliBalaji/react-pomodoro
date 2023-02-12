import styles from "./maincomponent.module.css";
import Button from "./components/Button";
import { dashboard } from "./constants/textConstants";
import { Link } from 'react-router-dom';
import { Header } from "./components/Header";
import commonStyles from './main.module.css';

const timerImage = require("./images/timer.png");

const Description = ({ text }: { text: string }) => {
  return <p style={{ marginTop: 10 }}>{text}</p>;
};

const MainComponent = () => {
  return (
    <div id="intro" className={commonStyles.container}>
      <Header/>
      <div id="image_area" className={styles.imageContainer}>
        <img
          id="timer_img"
          alt="Pomodoro timer"
          src={timerImage}
          height={400}
          width={400}
        />
        <div id="description" className={styles.description}>
          <h2 style={{ textAlign: "center" }}>
            {dashboard.dashboardDescription}
          </h2>
          <h4 style={{ marginTop: 20 }}>{dashboard.stepsTitle}</h4>
          <Description text={dashboard.point1} />
          <Description text={dashboard.point2} />
          <Description text={dashboard.point3} />
          <Description text={dashboard.point4} />
          <Description text={dashboard.point5} />
        </div>
      </div>
      <div id="start_button" className={styles.buttonContainer}>
        <Link to="todo_list"><Button type="ghost">
          {dashboard.buttonText}
        </Button></Link>
      </div>
    </div>
  );
};
export default MainComponent;
