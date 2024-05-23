import { GlobalFetch } from "../../../utils/Fetch/FetchUtils";
// @ts-ignore: Unreachable code error
import {NotificationManager} from 'react-notifications';

export const onSubmit = async (values:any, props: any) => {
    const { hideModal } = props;

    const payload:Response|any = await GlobalFetch({method: "PATCH", url:"/user/friendRequest" ,data:values});

    if(!payload || payload?.status>=300){
        return;
    }

    NotificationManager.success("Wysłano zaproszenie!");
    hideModal();
    
}