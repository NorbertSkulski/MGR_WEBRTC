import { Button } from "@mui/material"
import "./AppButton.scss"
import { MouseEventHandler, ReactComponentElement, ReactElement } from "react"


type AppButtonType = {
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: any;
    type: "button" | "submit" | "reset" | undefined;
    variant:"outlined" | "text" | "contained";
}

const AppButton = (props: AppButtonType) => {
    const { className, onClick, children, ...rest } = props;
    return <Button className={`AppButton ${className}`} onClick={onClick} {...rest} >{children}</Button>
}


export default AppButton;