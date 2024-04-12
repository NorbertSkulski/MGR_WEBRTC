import { useForm } from "react-hook-form";
import { onSubmit } from "./LoginFromSubmit";
import Input from "../../Inputs/Input/Input";
import "./LoginForm.scss";
import AppButton from "../../Buttons/AppButton/AppButton";
import AppLogo from "../../../assets/images/video-call.png";

const LoginForm = () => {
  const { handleSubmit, ...rest } = useForm();
  return (
    <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
      <img className="my-5" src={AppLogo} width={150} height={150}/>
      <Input
        variant="outlined"
        type="text"
        name="login"
        label="Login"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <Input        
        variant="outlined"
        type="password"
        name="password"
        label="Password"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <AppButton className="my-3" type="submit" variant="contained" onClick={()=>console.log("Login!")}>
        Logowanie
      </AppButton>
      <AppButton className="mb-5" type="button" variant="text" onClick={()=>console.log("Rej!")}>
        Rejestracja
      </AppButton>
    </form>
  );
};

export default LoginForm;
