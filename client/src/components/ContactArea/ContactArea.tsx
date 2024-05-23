import { Icon, IconButton, Tooltip } from "@mui/material";
import MainTable from "../Tables/MainTable/MainTable";
import "./ContactArea.scss";
import AddFriendModal from "../Modals/AddFriendModal/AddFriendModal";
import { GlobalFetch } from "../../utils/Fetch/FetchUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";
import { useEffect, useState } from "react";
import AppButton from "../Buttons/AppButton/AppButton";
// @ts-ignore: Unreachable code error
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

const ContactArea = () => {
  const { data, refetch } = useQuery({
    queryKey: ["contactListRequest"],
    queryFn: () =>
      GlobalFetch({ method: "GET", url: "/contact/contactList" }).then(
        ({ data }) => data
      ),
  });

  const socket: Socket = useSelector(
  
  (state: any) => state?.SocketReducer?.socket
  );
  socket.on("callRejected",()=>{
    setShowCallModal(false);
  })

  const callRejected = () => {
    socket.emit("callRejected",selectedElement)
    setSelectedElement("");
    setShowCallModal(false);
  }

  const userData = useSelector((state: any) => state?.AuthReducer?.user);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState("");

  const { mutate, isSuccess } = useMutation({
    mutationFn: (data: string) =>
      GlobalFetch({ url: `/contact/delete/${data}`, method: "DELETE" }),
  });

  const setDeleteFunction = (data: boolean) => {
    setShowDeleteModal(data);
    setSelectedElement("");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setShowDeleteModal(false);
      setSelectedElement("");
      NotificationManager.success("Usunięto!");
    }
  }, [isSuccess]);

  return (
    <div className="ContactArea">
      <h3>Kontakty</h3>
      <MainTable
        style={{ maxHeight: "45rem" }}
        className="mt-5"
        headers={[
          { key: "id", name: "ID", width: "100px" },
          { key: "name", name: "Imie", width: "auto" },
          { key: "lastName", name: "Nazwisko", width: "auto" },
          { key: "buttons", width: "10%" },
        ]}
        data={data?.map((el: any) => ({
          ...el,
          buttons: (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip arrow placement="top" title="Zadzwoń">
                <IconButton
                  className="me-1"
                  onClick={() => {
                    socket.emit("call", {
                      fromUser: userData.uuid,
                      toUser: el.uuid,
                    });
                    setSelectedElement(el.uuid);
                    setShowCallModal(true);
                  }}
                  size="small"
                >
                  <Icon style={{ color: "#4caf50" }}>call</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="top" title="Usuń">
                <IconButton
                  className="ms-1"
                  onClick={() => {
                    setSelectedElement(el.uuid);
                    setShowDeleteModal(true);
                  }}
                  size="small"
                >
                  <Icon style={{ color: "red" }}>delete</Icon>
                </IconButton>
              </Tooltip>
            </div>
          ),
        }))}
      />
      <AddFriendModal />
      <ConfirmModal
        headerText="Czy chcesz usunąć kontakt ?"
        show={showDeleteModal}
        setShow={setDeleteFunction}
      >
        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            alignItems: "center",
            height: "6rem",
          }}
        >
          <AppButton
            style={{ background: "rgb(0, 219, 99)" }}
            type="button"
            variant="contained"
            onClick={() => mutate(selectedElement)}
          >
            Usuń
          </AppButton>
          <AppButton
            style={{ background: "red" }}
            type="button"
            variant="contained"
            onClick={() => setDeleteFunction(false)}
          >
            Anuluj
          </AppButton>
        </div>
      </ConfirmModal>
      <ConfirmModal
        headerText="Nawiązywanie połączenia ..."
        show={showCallModal}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "6rem",
          }}
        >
          <AppButton
            style={{ background: "red" }}
            type="button"
            variant="contained"
            onClick={callRejected}
          >
            Anuluj
          </AppButton>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default ContactArea;
