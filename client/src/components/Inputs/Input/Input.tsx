import "../Input/Input.scss";
import { TextField } from "@mui/material";
import {get} from "lodash";
type TextInputProps = {
  type: string;
  name: string;
  form: any;
  label?: string;
  validation?: Object;
  variant?:string;
  className?:string;
};

const Input = (props: TextInputProps) => {
  const {
    form,
    name,
    validation,   
    variant, 
    className,
    ...rest
  } = props;
  const error = get(form,`formState.errors.${name}.message`,null);
  const register = form?.register;
  console.log("err:", error);
  return (
    <>
      <TextField className={`Input ${className}`} variant={variant||"standard"} error={Boolean(error)} id={name}  {...rest} {...register(name,validation)} helperText={error}/>
    </>
  );
};

export default Input;
