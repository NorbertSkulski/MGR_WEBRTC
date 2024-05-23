import "../Input/Input.scss";
import { TextField, TextFieldVariants } from "@mui/material";
import { get } from "lodash";
type TextInputProps = {
  type: string;
  name: string;
  form: any;
  label?: string;
  validation?: Object;
  variant?: TextFieldVariants;
  className?: string;
  onChange?: Function;
  accept?: string;
};

const Input = (props: TextInputProps) => {
  const {
    form,
    name,
    validation,
    variant,
    className,
    onChange,
    accept,
    ...rest
  } = props;
  const error = get(form, `formState.errors.${name}.message`, null);
  const register = form?.register(name, validation);
  const { onChange: regOnChange } = register;

  const innerOnChange = (e: Event) => {
    regOnChange(e);
    if (!onChange) return;
    onChange(e);
  };

  return (
    <>
      <TextField
        className={`Input ${className}`}
        variant={variant || "standard"}
        error={Boolean(error)}
        id={name}
        inputProps={{accept:accept}}
        {...rest}
        {...register}
        onChange={innerOnChange}
        helperText={error}
        accept={accept}
        
      />
    </>
  );
};

export default Input;
