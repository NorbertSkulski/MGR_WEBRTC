import "../Dashboard/Dashboard.scss";
import MenuList from "../../components/MenuList/MenuList";
import FriendsList from "../../components/FriendsList/FriendsList";
import ContentArea from "../../components/ContentArea/ContentArea";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { setSocket } from "../../redux/reducers/SocketReducer/SocketReducer";
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal";
import AppButton from "../../components/Buttons/AppButton/AppButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHook";

const Dashboard = (props: Object) => {
  const socketInReducer = useAppSelector(
    (state: any) => state?.SocketReducer?.socket
  );

  const userData = useAppSelector(
    (state: any) => state?.AuthReducer?.user
  );

  const dispatch = useAppDispatch();

  const setSocketReducer = (socket: Socket) => dispatch(setSocket(socket));

  const [showReceiveCallModal, setShowReceiveCallModal] = useState(false);

  const callerData = useRef<any>();

  const nav = useNavigate();



  useEffect(() => {
    if (!socketInReducer || socketInReducer.connected===true) {
      const socket = io(String(process.env.REACT_APP_API_SOCKET_URL), {
        path: "/api/socket",
      });
      socket.on("connect",()=>{
        socket.emit("connectedUser",userData)
        console.log("%c Connected !","color: green;")
      })
      socket.on("call",(room)=>{
        console.log("Call!",room);
        if(userData?.uuid !== room?.callerId){
          callerData.current = room;
          setShowReceiveCallModal(true);
        }
      })

      socket.on("acceptedCall",(payload)=>{
        nav(`/dashboard/call/${payload}`);
      })

      socket.on("callRejected",()=>{
        setShowReceiveCallModal(false);
      })
      setSocketReducer(socket);
    }
  }, []);

  const acceptCall = () => {
    socketInReducer.emit(`acceptCall`,callerData?.current?.roomId)    
    setShowReceiveCallModal(false);
  }

  const callRejected = () => {
    socketInReducer.emit("callRejected",callerData?.current?.roomId)
    setShowReceiveCallModal(false);
  }



  return (
    <div className="Dashboard">
      <MenuList />
      <FriendsList />
      <ContentArea />
      <ConfirmModal
        headerText={`Połączenie od: ${callerData?.current?.userFullName}`}
        show={showReceiveCallModal}
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
            onClick={acceptCall}
          >
            Odbierz
          </AppButton>
          <AppButton
            style={{ background: "red" }}
            type="button"
            variant="contained"
            onClick={callRejected}
          >
            Odrzuć
          </AppButton>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default Dashboard;
