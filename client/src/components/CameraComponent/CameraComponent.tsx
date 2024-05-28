import { useEffect, useRef, useState } from "react";
import "./CameraComponent.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

type CameraComponentType = {
  stream: MediaProvider | any;
  selfCamera?: boolean;
};

type SendPeerAnswer = {
  roomId: string;
  userUuid: string;
  answer: RTCSessionDescriptionInit;
};

type SendPeerOffer = {
  roomId: string;
  userUuid: string;
  peerOffer: RTCSessionDescriptionInit;
};

const CameraComponent = (props: CameraComponentType) => {
  const { stream } = props;
  const param = useParams();
  const { roomId } = param;

  const socket: Socket = useSelector(
    (state: any) => state?.SocketReducer?.socket
  );
  const userData = useSelector((state: any) => state?.AuthReducer?.user);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<any>(null);
  const [streamIsReady, setStreamIsReady] = useState(false);

  const setRemoteDescr = async (payload: RTCSessionDescriptionInit) => {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(payload));
    } catch (err) {
      console.error("setRemoteDescriptionError", err);
      setRemoteDescr(payload);
    }
  };

  const createConnection = async () => {
    if (peer && stream) {
      socket.on("getPeerFromOther", async (payload: SendPeerOffer) => {
        if (payload.userUuid !== userData.uuid && payload.roomId === roomId) {
          await setRemoteDescr(payload.peerOffer);
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(new RTCSessionDescription(answer));
          socket.emit("sendAnswerToOther", {
            roomId: param.roomId,
            answer: answer,
            userUuid: userData.uuid,
          });
        }
      });

      socket.on("getAnswerFromOther", async (payload: SendPeerAnswer) => {
        if (payload.userUuid !== userData.uuid && payload.roomId === roomId) {
          await setRemoteDescr(payload.answer);
        }
      });

      peer.ontrack = async (event: any) => {
        const [remoteStream] = event.streams;
        const video = videoRef.current;
        if (!video) {
          return;
        }
        const isPlaying = !video.paused;
        if (isPlaying) {
          return;
        }
        video.srcObject = remoteStream;
        video.play();
      };

      stream.getTracks().forEach((track: any) => {
        peer.addTrack(track, stream);
      });
    }
  };

  useEffect(() => {
    createConnection();
  }, [stream?.id, peer]);

  const initCall = async () => {
    console.log("initcall");
    const peerOffer = await peer.createOffer();
    await peer.setLocalDescription(new RTCSessionDescription(peerOffer));
    socket.emit("sendPeerToOther", {
      roomId: param.roomId,
      peerOffer: peerOffer,
      userUuid: userData.uuid,
    });
  };

  const isStreamActivated = () => {
    if (Boolean(stream) && Boolean(peer)) {
      const timeout = setTimeout(() => {
        socket.emit("initCall", { userUuid: userData.uuid, roomId: roomId });
        clearTimeout(timeout);
      }, 500);
    }
  };

  const isStreamReady = ()=>{
    if (Boolean(stream) && Boolean(peer) && streamIsReady){
      initCall();
    }
  }

  useEffect(()=>{isStreamReady()},[stream?.uuid,peer,streamIsReady])

  useEffect(()=>{
    isStreamActivated();
  },[streamIsReady, stream?.id, peer])

  socket.on("initCall", (payload) => {
    if (payload.userUuid !== userData.uuid) {
      setStreamIsReady(true);
    }
  });


  const initialize = async () => {
    const configuration: object = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.l.google.com:5349" },
        { urls: "stun:stun1.l.google.com:3478" },
        { urls: "stun:stun1.l.google.com:5349" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:5349" },
        { urls: "stun:stun3.l.google.com:3478" },
        { urls: "stun:stun3.l.google.com:5349" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:5349" },
      ],
    };
    setPeer(new RTCPeerConnection(configuration));
  };

  useEffect(() => {
    initialize();
    return () => {
      stopStream();
    };
  }, []);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track: any) => {
        if (track.readyState == "live") {
          track.stop();
        }
      });
    }
  };
  console.log("strim", stream?.id, peer);
  return (
    <div className="CameraComponent">
      <video ref={videoRef}></video>
    </div>
  );
};

export default CameraComponent;
