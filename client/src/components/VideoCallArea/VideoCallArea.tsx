import { useEffect, useRef, useState } from "react";
import CameraComponent from "../CameraComponent/CameraComponent";
import "./VideoCallArea.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { Icon, IconButton } from "@mui/material";

const VideoCallArea = () => {
  const param = useParams();

  const videoRef = useRef<HTMLVideoElement>(null);

  const nav = useNavigate();

  const [stream, setStream] = useState<MediaProvider | any>(null);

  const socket: Socket = useSelector(
    (state: any) => state?.SocketReducer?.socket
  );

  socket.emit("clientInRoom", param.roomId);

  const [clientsAmount, setClientsAmount] = useState(0);

  socket.on("clientInRoom", (payload) => {
    console.log("clients: ", payload);
    if (payload > 0) setClientsAmount(payload - 1);
  });

  const getStream = async () => {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  };

  const initStream = async () => {
    setStream(await getStream());
  };

  useEffect(() => {
    initStream();
  }, []);

  const setLocalCamera = () => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = stream || null;
    videoRef.current.play();
    videoRef.current.muted = true;
  };

  useEffect(() => {
    if (!stream) return;
    setLocalCamera();
  }, [stream]);

  return (
    <div className="VideoCallArea">
      {stream
        ? Array.from(Array(clientsAmount).keys()).map((_, idx) => (
            <CameraComponent key={idx} stream={stream} />
          ))
        : null}
      <div className="CameraComponent">
        <video ref={videoRef}></video>
      </div>
      <div className="ButtonVideoArea">
        <IconButton         
          onClick={() => {
            nav("/dashboard/contact");
          }}
          size="small"
        >
          <Icon style={{ color: "red" }}>call_end</Icon>
        </IconButton>
      </div>
    </div>
  );
};

export default VideoCallArea;
