import { Avatar, Button } from "@mui/material";
import Input from "../../Inputs/Input/Input";
import "./ProfileForm.scss";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { onSubmit } from "./ProfileFormSubmit";
import { get } from "lodash";

const ProfileForm = () => {
  const { handleSubmit, ...rest } = useForm();
  const [avatarUrl,setAvatarUrl]= useState("");

  const {watch} = rest;

  const selectPicture = () => {
    const currentObj: HTMLElement|null = document.querySelector(".ProfileImage input");
    currentObj?.click();
  };

  useEffect(()=>{
    const image:Blob = get(watch('ProfileImage'),'[0]',null);
    if(image === null)
      return; 
    const fileReader = new FileReader();
    fileReader.onload =(evt)=> {
      const url:any= evt?.target?.result
      setAvatarUrl(url)
    }
    fileReader.readAsDataURL(image);
  },[watch('ProfileImage')])

  return (
    <div className="ProfileForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Avatar src={avatarUrl}></Avatar>
        <Input
          className="ProfileImage"
          name="ProfileImage"
          form={rest}
          type="file"
        />
        <Button onClick={selectPicture}>Dodaj zdjęcie</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfileForm;
