import { useState } from "react";
import MainModal from "../MainModal/MainModal";
import { Button } from "react-bootstrap";
import AddFriendForm from "../../Forms/AddFriendForm/AddFriendForm";

const AddFriendModal = () => {
  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        className="AddContactButton"
        variant="contained"
      >
        Dodaj kontakt
      </Button>

      <MainModal headerText="Dodaj znajomego" show={show} setShow={setShow}>
        <AddFriendForm hideModal={hideModal}/>
      </MainModal>
    </>
  );
};

export default AddFriendModal;
