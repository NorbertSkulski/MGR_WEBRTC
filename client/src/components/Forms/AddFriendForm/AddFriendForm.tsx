import { useForm } from "react-hook-form";
import { onSubmit } from "./AddFriendFormSubmit";
import Input from "../../Inputs/Input/Input";
import AppButton from "../../Buttons/AppButton/AppButton";
import { MouseEventHandler } from "react";

export type AddFriendFormType = {
    hideModal: MouseEventHandler<HTMLButtonElement>|any;
}

const AddFriendForm = (props:AddFriendFormType) => {
  const { handleSubmit, ...rest } = useForm();

  

  return (
    <form className="AddFriendForm" onSubmit={handleSubmit((val)=>onSubmit(val,{...props, ...rest}))}>
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="id"
        label="ID"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />     
      <AppButton className="mb-2" style={{width:"100%"}} type="submit" variant="contained">
        Wyślij
      </AppButton>      
    </form>
  );
};

export default AddFriendForm;
