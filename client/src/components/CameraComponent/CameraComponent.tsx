import { useEffect, useRef, useState } from "react";
import "./CameraComponent.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

type CameraComponentType = {
  externalPeer?: RTCSessionDescriptionInit;
  internalPeer?: RTCPeerConnection;
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
  const { selfCamera } = props;
  const param = useParams();
  const { roomId } = param;

  const socket: Socket = useSelector(
    (state: any) => state?.SocketReducer?.socket
  );
  const userData = useSelector((state: any) => state?.AuthReducer?.user);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaProvider | any>(null);
  const [peer, setPeer] = useState<any>(null);

  const createConnection = async () => {
    if (peer && !selfCamera) {
      socket.on("getPeerFromOther", async (payload: SendPeerOffer) => {
        if (payload.userUuid !== userData.uuid && payload.roomId === roomId) {
          await peer.setRemoteDescription(
            new RTCSessionDescription(payload.peerOffer)
          );
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
          await peer.setRemoteDescription(
            new RTCSessionDescription(payload.answer)
          );
        }
      });

      peer.addEventListener("track", async (event: any) => {
        const [remoteStream] = event.streams;
        if (!videoRef.current) {
          return;
        }
        videoRef.current.srcObject = remoteStream;
        const timeout = setTimeout(() => {
          if (videoRef.current) videoRef.current.play();
          clearTimeout(timeout);
        }, 500);
      });

      streamRef.current.getTracks().forEach((track: any) => {
        peer.addTrack(track, streamRef.current);
      });
    }
  };

  useEffect(() => {
    createConnection();
  }, [peer]);

  const getStream = async () => {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  };

  const initCall = async () => {
    const peerOffer = await peer.createOffer();
    await peer.setLocalDescription(new RTCSessionDescription(peerOffer));
    socket.emit("sendPeerToOther", {
      roomId: param.roomId,
      peerOffer: peerOffer,
      userUuid: userData.uuid,
    });
  };

  const isStreamActivated = () => {
    if (selfCamera) {
      return;
    }
    if (Boolean(streamRef.current)) {
      const timeout = setTimeout(() => {
        initCall();
        clearTimeout(timeout);
      }, 500);
    }
  };

  useEffect(() => {
    isStreamActivated();
  }, [streamRef.current]);

  const initialize = async () => {
    streamRef.current = await getStream();
    if (!streamRef.current) {
      return;
    }
    if (!videoRef.current) {
      return;
    }
    if (selfCamera) {
      videoRef.current.srcObject = streamRef.current || null;
      videoRef.current.play();
      videoRef.current.muted = true;
      return;
    } else {
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
    }
  };

  useEffect(() => {
    initialize();
    return () => {
      stopStream();
    };
  }, []);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: any) => {
        if (track.readyState == "live") {
          track.stop();
        }
      });
    }
  };

  return (
    <div className="CameraComponent">
      <video ref={videoRef}></video>
      <button onClick={stopStream}>stop</button>
      {!selfCamera ? (
        <button
          onClick={async () => {
            const peerOffer = await peer.createOffer();
            await peer.setLocalDescription(
              new RTCSessionDescription(peerOffer)
            );
            socket.emit("sendPeerToOther", {
              roomId: param.roomId,
              peerOffer: peerOffer,
              userUuid: userData.uuid,
            });
          }}
        >
          test
        </button>
      ) : null}
    </div>
  );
};

export default CameraComponent;
