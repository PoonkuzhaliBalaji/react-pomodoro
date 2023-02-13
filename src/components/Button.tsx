import { Button as AntdButton } from "antd";
import styles from './button.module.css';

type ButtonType = "text" | "link" | "ghost" | "default" | "primary" | "dashed";

type ButtonProps = {
  type?: ButtonType;
  className?: string;
  children: string;
  onClick?: () => void;
  disabled?: boolean
};

const Button = ({ type, className = 'primary', children, onClick, disabled }: ButtonProps) => {
  return (
    <AntdButton type={type} className={styles[className]} onClick={onClick} disabled={disabled}>
      {children}
    </AntdButton>
  );
};

export default Button;
