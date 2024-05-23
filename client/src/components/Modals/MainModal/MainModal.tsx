import { createPortal } from "react-dom";
import { usePortal } from "../../../hooks/portal/portalHook";
import { ReactNode, useEffect, useRef, useState } from "react";
import "./MainModal.scss";
import { Button, Icon, IconButton } from "@mui/material";

type MainModalType = {
  children: ReactNode;
  show: boolean;
  setShow?: Function;
  headerText?: string;
  width?: string;
  height?: string;
};

const MainModal = (props: MainModalType) => {
  const { children, show, headerText, setShow, width, height } = props;
  const target: HTMLDivElement = usePortal("modal");

  const modalRef: any = useRef();

  useEffect(() => {
    const clickLisener = (e: any) => {
      if (
        e?.target?.type === "button" ||
        e?.target?.offsetParent?.type === "button"
      ) {
        return;
      }
      if (!modalRef?.current?.contains(e?.target) && setShow) setShow(false);
    };
    document.addEventListener("click", clickLisener);
    return () => document.removeEventListener("click", clickLisener);
  }, []);

  if (!show) {
    return null;
  }

  return createPortal(
    <>
      <div style={{ width, height }} ref={modalRef} className="MainModal">
        <div className="ModalHeader">
          <h4>{headerText || "Header"}</h4>
          {setShow ? (
            <IconButton onClick={() => setShow(false)}>
              <Icon>close</Icon>
            </IconButton>
          ) : null}
        </div>
        <div className="ModalBody"> {children}</div>
      </div>
      <div className="BackgroundModal"></div>
    </>,
    target
  );
};

export default MainModal;
