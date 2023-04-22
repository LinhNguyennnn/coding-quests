import React, { 
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
 } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const { messages, setLatestMessage } = useContext(LatestMessagesContext);

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [messageHistory, setMessageHistory] = useState([
    { user: "bot", message: messages["bot"] },
  ]);

  const bottomRef = useRef(null);

  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);

  const sendMessage = useCallback(() => {
    playSend();
    setMessage("");
    setMessageHistory((prev) => [...prev, { user: "me", message }]);
    socket.emit("user-message", message);
  }, [message, playSend]);

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socket.on("bot-message", (message) => {
      setTyping(false);
      setLatestMessage("bot", message);
      setMessageHistory((prev) => [...prev, { user: "bot", message }]);
    });

    socket.on("bot-typing", () => {
      setTyping(true);
    });
    
  }, [setMessageHistory]);

  useEffect(() => {
    if (!typing) {
      playReceive();
    }
  }, [playReceive, typing]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory.length, typing])

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messageHistory.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            nextMessage={messageHistory[index + 1]}
            botTyping={typing}
          />
        ))}
        {typing && <TypingMessage />}
        <div ref={bottomRef} />
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
