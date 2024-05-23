import { Button } from "@mui/material";
import "./AppButton.scss";
import { CSSProperties, MouseEventHandler, ReactComponentElement, ReactElement } from "react";

type AppButtonType = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
  children: any;
  type: "button" | "submit" | "reset" | undefined;
  variant: "outlined" | "text" | "contained";
  style?:CSSProperties;
  form?:string
};

const AppButton = (props: AppButtonType) => {
  const { className, onClick, children, onMouseUp,style ,...rest } = props;
  return (
    <Button
      className={`AppButton ${className}`}
      onMouseUp={onMouseUp}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
