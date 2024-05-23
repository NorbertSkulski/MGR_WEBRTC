// @ts-ignore: Unreachable code error
import {NotificationManager} from 'react-notifications';
import { GlobalFetch } from '../../../utils/Fetch/FetchUtils';

export const onSubmit = (values:any, props: any) => {
    const { hideModal } = props;

    const payload : Response|any = GlobalFetch({method:'POST', url:'/user/registration',data:values})

    if(!payload || payload.status >=300){
        return;
    }

    NotificationManager.success("Zarejestrowano pomyślnie!");
    hideModal();
}