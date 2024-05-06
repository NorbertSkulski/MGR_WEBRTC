import { Avatar, Button } from "@mui/material";
import Input from "../../Inputs/Input/Input";
import "./ProfileForm.scss";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { onSubmit } from "./ProfileFormSubmit";
import { get } from "lodash";
import { Row, Col } from "react-bootstrap";

const ProfileForm = () => {
  const { handleSubmit, ...rest } = useForm();
  const [avatarUrl, setAvatarUrl] = useState("");

  const { watch } = rest;

  const selectPicture = () => {
    const currentObj: HTMLElement | null = document.querySelector(
      ".ProfileImage input"
    );
    currentObj?.click();
  };

  useEffect(() => {
    const image: Blob = get(watch("ProfileImage"), "[0]", null);
    if (image === null) return;
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      const url: any = evt?.target?.result;
      setAvatarUrl(url);
    };
    fileReader.readAsDataURL(image);
  }, [watch("ProfileImage")]);

  return (
    <div className="ProfileForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="AvatarArea">
          <Avatar className="Image mb-2" src={avatarUrl}></Avatar>
          <Input
            className="ProfileImage"
            name="ProfileImage"
            form={rest}
            type="file"
          />
          <Button onClick={selectPicture}>Dodaj zdjęcie</Button>
        </div>

        <Row>
          <Col xs={7}>
            <Input
              className="Name"
              name="Name"
              form={rest}
              type="text"
              label="Imię"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={7}>
            <Input
              className="LastName"
              name="LastName"
              form={rest}
              type="text"
              label="Nazwisko"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Input
              className="Login"
              name="Login"
              form={rest}
              type="text"
              label="Login"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Input
              className="Password"
              name="Password"
              form={rest}
              type="password"
              label="Hasło"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Input
              className="PasswordConfirm"
              name="PasswordConfirm"
              form={rest}
              type="password"
              label="Powtórz Hasło"
            />
          </Col>
        </Row>

        <Button className="SubmitButton" variant="contained" type="submit">
          Zapisz
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
