import { GlobalFetch } from "../../../utils/Fetch/FetchUtils";

export const onSubmit = (values:object) => {

    GlobalFetch({method: "GET", url:"/user"});
    console.log("Submit: ",values);
}

