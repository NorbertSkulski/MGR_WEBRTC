import { AddFriendFormType } from "./AddFriendForm"

export const onSubmit = (values:any, props: any) => {
    const { hideModal, setError } = props;
    console.log("Submit: ",values, props);
    setError("id",{type:"test",message:"Dupa romana"});
    hideModal();
}