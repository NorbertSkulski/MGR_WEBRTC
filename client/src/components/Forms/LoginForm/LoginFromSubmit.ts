import { setAuth, setUser } from "../../../redux/reducers/AuthReducer/AuthReducer";
import store from "../../../store"
import { GlobalFetch } from "../../../utils/Fetch/FetchUtils";

export const onSubmit = async(values: any,props:any) => {

    const {dispatch} = store;
    const {navigate, setIsLogging} = props;

    setIsLogging(true);
    const payload:Response|any = await GlobalFetch({method: "POST", url:"/auth/login" ,data:{ login: values?.login, password: values?.password }});

    if(!payload || payload?.status>=300){
        setIsLogging(false);
        return;
    }

    dispatch(setAuth(true));
    dispatch(setUser(payload?.data));
    navigate("/dashboard");
    setIsLogging(false);
}