import { useEffect, useRef, useState } from "react";
import CameraComponent from "../CameraComponent/CameraComponent";
import "./VideoCallArea.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { uniqBy } from "lodash";



const VideoCallArea = () => {
  const param = useParams();

  // const [peers, setPeers] = useState<any[]>([]);

  // const socket: Socket = useSelector(
  //   (state: any) => state?.SocketReducer?.socket
  // );
  // const userData = useSelector((state: any) => state?.AuthReducer?.user);

  // const configuration: object = {
  //   iceServers: [
  //     { urls: "stun:stun.l.google.com:19302" },
  //     { urls: "stun:stun.l.google.com:5349" },
  //     { urls: "stun:stun1.l.google.com:3478" },
  //     { urls: "stun:stun1.l.google.com:5349" },
  //     { urls: "stun:stun2.l.google.com:19302" },
  //     { urls: "stun:stun2.l.google.com:5349" },
  //     { urls: "stun:stun3.l.google.com:3478" },
  //     { urls: "stun:stun3.l.google.com:5349" },
  //     { urls: "stun:stun4.l.google.com:19302" },
  //     { urls: "stun:stun4.l.google.com:5349" },
  //   ],
  // };
  // let peer: any = null;

  // socket.on("getPeerFromOther", (payload: SendPeer) => {
  //   if (payload.userUuid !== userData.uuid) {
  //     setPeers((element: any) =>
  //       uniqBy([...element, payload.peerOffer], "sdp")
  //     );
  //   }
  // });

  // const connect = async () => {
  //   if (!peer) {
  //     peer = new RTCPeerConnection(configuration);
  //   }
  //   const peerOffer = await peer.createOffer();
  //   await peer.setLocalDescription(new RTCSessionDescription(peerOffer));
  //   socket.emit("sendPeerToOther", {
  //     roomId: param.roomId,
  //     peerOffer: peerOffer,
  //     userUuid: userData.uuid,
  //   });
  // };

  // useEffect(() => {
  //   connect();
  // }, []);

  // console.log("peers: ", peer?.signalingState);

  const socket: Socket = useSelector(
      (state: any) => state?.SocketReducer?.socket
    );

  socket.emit("clientInRoom", param.roomId);

  const [clientsAmount, setClientsAmount] = useState(0);

  socket.on("clientInRoom", (payload) => {
    console.log("clients: ", payload);
    if(payload > 0)
      setClientsAmount(payload-1);
  });

  return (
    <div className="VideoCallArea">
      {Array.from(Array(clientsAmount).keys()).map((_, idx) => (
        <CameraComponent key={idx} />
      ))}
      {/* <CameraComponent selfCamera={true} /> */}
    </div>
  );
};

export default VideoCallArea;
