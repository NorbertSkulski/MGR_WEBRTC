import { useForm } from "react-hook-form";
import { onSubmit } from "./LoginFromSubmit";
import Input from "../../Inputs/Input/Input";
import "./LoginForm.scss";
import AppButton from "../../Buttons/AppButton/AppButton";
import AppLogo from "../../../assets/images/video-call.png";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "../../Modals/RegistrationModal/RegistrationModal";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const LoginForm = () => {
  const { handleSubmit, ...rest } = useForm();
  const navigate = useNavigate();

  const [isLogging, setIsLogging] = useState(false);

  return (
    <form
      id="LoginForm"
      className="LoginForm"
      onSubmit={handleSubmit((val) => onSubmit(val, { navigate,setIsLogging }))}
    >
      <div className="LoaderContainer">
      {isLogging?<CircularProgress/>:<img className="my-5" alt="icon" src={AppLogo} width={150} height={150} />}
      </div>
      <Input
        className="mx-3"
        variant="filled"
        type="text"
        name="login"
        label="Login"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <Input
        className="mx-3"
        variant="filled"
        type="password"
        name="password"
        label="Password"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <AppButton
        form="LoginForm"
        className="my-3"
        type="submit"
        variant="contained"
        onClick={() => console.log("Login!")}
      >
        Logowanie
      </AppButton>

      <RegistrationModal
        Button={(innerProps: any) => (
          <AppButton
            {...innerProps}
            className="mb-5"
            type="button"
            variant="text"
          >
            Rejestracja
          </AppButton>
        )}
      />
    </form>
  );
};

export default LoginForm;
