import { dashboard } from "../constants/textConstants";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div id="header" className={styles.header}>
      <h2 className={styles.title}>{dashboard.dashboardTitle}</h2>
    </div>
  );
};
