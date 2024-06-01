import { setAuth } from "../../redux/reducers/AuthReducer/AuthReducer";
import store from "../../store";
import { AxiosRequestConfig } from 'axios';
import axios from "axios"; 
// @ts-ignore: Unreachable code error
import {NotificationManager} from 'react-notifications';



export const GlobalFetch = async (config:AxiosRequestConfig) =>{
    const {dispatch} = store;
    const unAuth = () => dispatch(setAuth(false));
    try{        
        return await axios(config)
    }catch(err:any){
        if(err?.response?.status === 401 || err?.response?.status === 403){
            unAuth();
            NotificationManager.error("Błąd autoryzacji!");
            return err.response;
        }
        NotificationManager.error(err?.response?.data || "Błąd");
        return err?.response;
    } 
}