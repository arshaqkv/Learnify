import { useEffect, useRef, useState } from "react";
import { X, Video, PhoneOff, Phone, VideoOff } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../ui/button";
import avatar from "../../assets/avatar.jpg";
import { Avatar, AvatarImage } from "../ui/avatar";
import Peer from "simple-peer";

const ChatHeader = () => {
  const { selectedUser, onlineUsers, socket } = useAppSelector(
    (state) => state.chat
  );
  const { user } = useAppSelector((state) => state.auth);

  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState<string | null>(null);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callerName, setCallerName] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  if (!socket) {
    return;
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
          console.log("Assigned stream to myVideo:", myVideo.current);
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    socket.on("callIncoming", ({ signal, from, name }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
      setCallerName(name);
      setCalling(true);
    });

    socket.on("callAccepted", (signal) => {
      if (peerRef.current) peerRef.current.signal(signal);
      setCallAccepted(true);
    });

    socket.on("callEnded", () => {
      setCallAccepted(false);
      setCalling(false);
      setReceivingCall(false);

      peerRef.current?.destroy();
      peerRef.current = null;

      setCaller(null);
      setCallerSignal(null);
      window.location.reload();
    });

    socket.on("videoToggled", ({ videoOff }) => {
      if (userVideo.current && userVideo.current.srcObject) {
        userVideo.current.srcObject.getVideoTracks().forEach((track: any) => {
          track.enabled = !videoOff; // Disable video if videoOff is true
        });
      }
    });

    return () => {
      socket.off("callIncoming");
      socket.off("callAccepted");
      socket.off("callEnded");
      socket.off("videoToggled");
    };
  }, [socket, calling]);

  const toggleVideo = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setVideoOff((prev) => {
        const newState = !prev;

        // Notify the other user about the video state change
        socket.emit("videoToggle", {
          to: selectedUser?._id,
          videoOff: newState,
        });

        return newState;
      });
    }
  };

  const callUser = () => {
    if (!selectedUser) return;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("callUser", {
        to: selectedUser._id,
        signal,
        from: user?._id,
        name: `${user?.firstname} ${user?.lastname}`,
      });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    peerRef.current = peer;
    setCalling(true);
  };

  const answerCall = () => {
    setCallAccepted(true);
    setReceivingCall(false);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("acceptCall", { to: caller, signal });
      setCallAccepted(true);
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    peer.signal(callerSignal);
    peerRef.current = peer;
  };

  const leaveCall = () => {
    if (selectedUser) {
      socket.emit("callEnded", { to: selectedUser._id });
    }
    setCallAccepted(false);
    setCalling(false);
    setReceivingCall(false);

    peerRef.current?.destroy();
    peerRef.current = null;
    window.location.reload();
  };

  console.log(calling, callAccepted, receivingCall);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={selectedUser?.profileImage || avatar}
              className=" object-cover"
            />
          </Avatar>
          <div>
            <h3 className="font-medium">{`${selectedUser?.firstname} ${selectedUser?.lastname}`}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {onlineUsers.includes(selectedUser?._id) && (
            <Button
              onClick={callUser}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Video />
            </Button>
          )}
          <button>
            <X />
          </button>
        </div>
      </div>

      {(calling || receivingCall || callAccepted) && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 z-50">
          {callAccepted && (
            <video
              ref={userVideo}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          <video
            ref={myVideo}
            autoPlay
            playsInline
            muted
            className="absolute bottom-2 right-2 w-1/4 h-1/4 border-2 border-white rounded-lg"
          />

          {receivingCall && !callAccepted && (
            <div className="flex flex-col items-center gap-4 absolute">
              <p className="text-white animate-pulse">
                {callerName} Calling...
              </p>
              <Button
                onClick={answerCall}
                className="bg-green-500 hover:bg-green-600"
              >
                <Phone className="mr-2" /> Answer
              </Button>
            </div>
          )}

          <div className="absolute bottom-5 flex gap-4">
            <Button
              onClick={toggleVideo}
              className="hover:bg-gray-600"
            >
              {videoOff ? <Video /> : <VideoOff />}
            </Button>
            <Button onClick={leaveCall} className="bg-red-500 hover:bg-red-600">
              <PhoneOff className="mr-2" /> Hang Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
