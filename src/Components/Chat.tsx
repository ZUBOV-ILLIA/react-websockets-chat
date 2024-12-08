import { useEffect, useRef, useState } from "react";
import { webSocketServer } from "../constants";

type Message = {
  event: string;
  userName: string;
  message: string;
  id: number;
};

export default function Chat() {
  const socket = useRef<WebSocket | null>(null);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const [inp, setInp] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // return () => {
    //   socket.current.close();
    // };
  }, []);

  async function sendMessage() {
    const message = {
      event: "message",
      userName,
      message: inp,
      id: Date.now(),
    };

    socket.current?.send(JSON.stringify(message));
    setInp("");
  }

  function connect() {
    if (socket === null || userName.trim() === "") return;

    socket.current = new WebSocket(webSocketServer);

    socket.current.onopen = () => {
      console.log("Connected to server");
      setConnected(true);

      const message = {
        event: "connection",
        userName,
        id: Date.now(),
      };

      socket.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);

      setTimeout(() => {
        if (messagesListRef.current) {
          messagesListRef.current.scrollTo({
            top: messagesListRef.current.scrollHeight,
          });
        }
      }, 0);
    };

    socket.current.onclose = () => {
      console.log("Disconnected from server");
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  function disconnect() {
    if (socket.current) {
      socket.current.close();
      setConnected(false);
    }
  }

  if (!connected) {
    return (
      <div className="flex w-full items-center p-4">
        <form
          className="flex w-full flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            connect();
          }}
        >
          <input
            className="grow rounded-xl bg-slate-400 p-4 placeholder:text-black"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button className="border p-3">Log-in</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="m-3 flex w-full flex-col gap-3 overflow-y-scroll rounded-lg border p-4">
        <div
          ref={messagesListRef}
          className="messages-list flex h-full flex-col overflow-y-scroll break-all rounded-lg bg-slate-400 p-2"
          style={{ maxHeight: "calc(100vh - 200px" }}
        >
          {/* <div ref={messagesListInnerRef} className="p-2"> */}
          {messages.map((message) => (
            <div key={message.id}>
              {message.event === "connection" ? (
                <p className="text-center text-sm text-gray-500">
                  User <b className="text-black">{message.userName}</b>{" "}
                  connected
                </p>
              ) : (
                <span className="text-black">
                  <p>
                    {message.userName}:{" "}
                    <span className="font-thin"> {message.message}</span>
                  </p>
                </span>
              )}
            </div>
          ))}
          {/* </div> */}
        </div>

        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className="w-full rounded-l-xl bg-slate-400 p-4"
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button className="rounded-r-xl bg-slate-500 p-3">Send</button>
        </form>
      </div>

      <button
        className="fixed right-2 top-1 z-10 rounded-lg bg-red-600 p-2 text-white"
        onClick={disconnect}
      >
        Disconnect
      </button>
    </>
  );
}
