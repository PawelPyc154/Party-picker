import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsFillChatFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import io from 'socket.io-client';
import styled from 'styled-components';
import { AppState } from '../../../state/allReducers';
import { MessageTypes } from '../../../state/auth/auth';

let socket: SocketIOClient.Socket;

export interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<MessageTypes>>([]);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_URL}/chat`);
    return () => {
      socket.emit('disconnect');
      socket.off('');
    };
  }, [user]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages',
      duration: 0,
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message) return;
    socket.emit('sendMessage', message, (callback: MessageTypes[]) => {
      setMessages(callback);
      setMessage('');
    });
  };

  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!user) return;
    setMessages(user.chat);
    animateScroll.scrollToBottom({
      containerId: 'messages',
      duration: 0,
    });
    if (input.current === null) return;
    input.current.focus();
  }, [isOpenChat, user]);
  return (
    <>
      {isOpenChat ? (
        <ChatContainer>
          <TopBar>
            <CloseButton onClick={() => setIsOpenChat(false)}>
              <MdCloseIcone />
            </CloseButton>
          </TopBar>
          <Messages id="messages">
            {messages.length === 0 ? (
              <NoMessages>Napisz do nas</NoMessages>
            ) : (
              messages?.map((item, index) => (
                <Message key={index} className={user?._id === item.user._id ? 'userMessage' : ''}>
                  {item.message}
                </Message>
              ))
            )}
          </Messages>
          <BottomBar>
            <Input
              ref={input}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(event) => (event.key === 'Enter' ? handleSendMessage() : null)}
            />
            <SendButton onClick={() => handleSendMessage()}>
              <AiOutlineSend />
            </SendButton>
          </BottomBar>
        </ChatContainer>
      ) : (
        <Button onClick={() => setIsOpenChat(true)}>
          <BsFillChatFillIcone />
        </Button>
      )}
    </>
  );
};

export default Chat;

const ChatContainer = styled.div`
  z-index: 600;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  grid-template-columns: 1fr;
  ${({ theme }) => theme.mq.md} {
    bottom: 5px;
    left: 5px;
    width: 350px;
    height: 400px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.borderPrimary};
  }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Messages = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.borderPrimary};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderPrimary};
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.scrollbarThumb};
    outline: 1px solid ${(props) => props.theme.colors.scrollbarThumb};
  }
`;

const Message = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 1px 0;
  flex-shrink: 0;
  padding: 8px;
  max-width: 50%;
  overflow-wrap: anywhere;
  &.userMessage {
    align-self: flex-end;
    border: 1px solid ${(props) => props.theme.colors.layout};
  }
`;

const NoMessages = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 16px;
  justify-self: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin: 40% 0 0;
  flex-shrink: 0;
  padding: 8px;
  overflow-wrap: anywhere;
`;

const CloseButton = styled.button`
  border: none;
  font-size: 27px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.layout};
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const MdCloseIcone = styled(MdClose)`
  font-size: 27px;
`;

const BottomBar = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  padding: 0 5px 0 15px;
  font-size: 16px;
  width: 100%;
  border-top-left-radius: 17.5px;
  border-bottom-left-radius: 17.5px;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.hover};
  }
`;
const SendButton = styled.button`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  border-left: none;
  padding: 0 5px;
  font-size: 25px;
  width: 50px;
  border-top-right-radius: 17.5px;
  border-bottom-right-radius: 17.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.hover};
    color: ${(props) => props.theme.colors.hover};
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.layout};
  border: none;
  border-radius: 25px;
  color: ${(props) => props.theme.colors.textThird};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    color: ${(props) => props.theme.colors.textPrimary};
    border: 2px solid ${(props) => props.theme.colors.hover};
  }
`;

const BsFillChatFillIcone = styled(BsFillChatFill)`
  font-size: 25px;
`;
