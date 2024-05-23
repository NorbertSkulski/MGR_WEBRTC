import { useForm } from "react-hook-form";
import { onSubmit } from "./RegistrationFormSubmit";
import Input from "../../Inputs/Input/Input";
import AppButton from "../../Buttons/AppButton/AppButton";
import { MouseEventHandler } from "react";

export type AddFriendFormType = {
  hideModal: MouseEventHandler<HTMLButtonElement> | any;
};

const RegistrationForm = (props: AddFriendFormType) => {
  const { handleSubmit, ...rest } = useForm();

  return (
    <form
      id="RegistrationForm"
      className="RegistrationForm"
      onSubmit={(e) => {
        handleSubmit((val) => onSubmit(val, { ...props, ...rest }))(e);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="email"
        label="Email"
        form={rest}
        validation={{
          required: "pole wymagane",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Wprowadzono zły format !",
          },
        }}
      />
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="name"
        label="Imię"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="lastName"
        label="Nazwisko"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="phone"
        label="Telefon"
        form={rest}
        validation={{
          pattern: {
            value: /^(0|[1-9][0-9 ]*)$/,
            message: "Wprowadzono zły format !",
          },}}
        // validation={{ required: "pole wymagane" }}
      />
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="text"
        name="login"
        label="Login"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <Input
        className="mt-2 mb-1"
        variant="outlined"
        type="password"
        name="password"
        label="Hasło"
        form={rest}
        validation={{ required: "pole wymagane" }}
      />
      <AppButton
        form="RegistrationForm"
        className="mb-2"
        style={{ width: "100%" }}
        type="submit"
        variant="contained"
      >
        Zarejestruj
      </AppButton>
    </form>
  );
};

export default RegistrationForm;
