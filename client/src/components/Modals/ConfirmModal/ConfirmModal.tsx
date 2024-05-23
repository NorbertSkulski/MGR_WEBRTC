import { useEffect, useState } from "react";
import MainModal from "../MainModal/MainModal";

type ConfirmModalPropsType = {
  headerText: string;
  show:boolean;
  setShow?:Function;
  children?: any;
};

const ConfirmModal = (props: ConfirmModalPropsType) => {
  const { show,setShow, children, headerText } = props;

  return (
    <MainModal headerText={headerText} show={show} width="30%" setShow={setShow}>
      {children}
    </MainModal>
  );
};

export default ConfirmModal;
