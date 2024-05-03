import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type AuthElementType = {
    children: ReactElement;
}
export const AuthElement = (props:AuthElementType) =>{
    const {children} = props
    const {isAuth} = useSelector((state:any) => state?.AuthReducer);
    
    return isAuth?children:<Navigate to="/login"/>
} 