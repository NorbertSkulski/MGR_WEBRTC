import { useState } from "react";
import MainModal from "../MainModal/MainModal";
import RegistrationForm from "../../Forms/RegistrationForm/RegistrationForm";

type RegistrationModalType = {
    Button: any
}

const RegistrationModal = (props:RegistrationModalType) => {
  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);

  const {Button} = props;
  return (
    <>     
      <Button  onClick={()=>setShow(true)}/>

      <MainModal width="30%" headerText="Rejestracja" show={show} setShow={setShow}>
        <RegistrationForm hideModal={hideModal}/>
      </MainModal>
    </>
  );
};

export default RegistrationModal;