import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/reduxHook";

type AuthElementType = {
    children: ReactElement;
}
export const AuthElement = (props:AuthElementType) =>{
    const {children} = props
    const {isAuth} = useAppSelector((state:any) => state?.AuthReducer);
    
    return isAuth?children:<Navigate to="/login"/>
} 