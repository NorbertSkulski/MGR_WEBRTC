import { useState } from "react";
import MainModal from "../MainModal/MainModal";
import { Button } from "react-bootstrap";

const AddFriendModal = () => {
  const [show, setShow] = useState(false);

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
        TEST
        <Button onClick={() => setShow(false)}>Hide</Button>
      </MainModal>
    </>
  );
};

export default AddFriendModal;
