'use client';

import { getUserChats } from '@/api/get-user-chats';
import * as S from './UserChatsPage.styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getUserData } from '@/helpers/get-user-data';
import { ChatCircleText, ArrowUp, ArrowDown } from '@phosphor-icons/react';
import { getCookie } from 'cookies-next';
import { format, isSameDay, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChatComponent } from '@/components/Chat';
import { Chat } from '@/@types/chat';
import { useParams } from 'next/navigation';

export function UserChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const loggedUser = getUserData();

  const params = useParams<{ 'active-chat-id'?: string[] }>();

  const fetchUserChats = useCallback(async () => {
    const token = getCookie('token');

    const response = await getUserChats(token || '');

    if (response.status === 200) {
      setChats(response.data);
    }
  }, []);

  useEffect(() => {
    fetchUserChats();
  }, [fetchUserChats]);

  useMemo(() => {
    if (params['active-chat-id']) {
      const chatId = params['active-chat-id'][0];

      const chat = chats.find(chat => chat.id === chatId);

      if (chat) {
        // window.location.href = `/area_logada/conversas`
        setOpenChat(chat);
      }
    }
  }, [params, chats]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    if (isSameDay(date, now)) {
      return format(date, 'HH:mm');
    } else if (differenceInDays(now, date) < 7) {
      return format(date, 'eeee', { locale: ptBR });
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  const handleOpenChatClick = (chat: Chat) => {
    setOpenChat(chat);
  };

  const handleReturnToChatsListClick = () => {
    window.location.href = '/area_logada/conversas';
    setTimeout(() => {
      setOpenChat(null);
      fetchUserChats();
    }, 1000);
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <h1>Minhas conversas</h1>
      </S.TitleWrapper>

      {openChat ? (
        <ChatComponent
          chatId={openChat.id}
          userData={loggedUser}
          handleReturnToChatsListClick={handleReturnToChatsListClick}
        />
      ) : (
        chats.map(chat => (
          <S.UserChat key={chat.id} onClick={() => handleOpenChatClick(chat)}>
            <ChatCircleText size={48} />

            <S.ChatContent>
              <S.ChatContentHeader>
                <S.ChatUserName>
                  {chat.user1.id === loggedUser?.id
                    ? chat.user2.name
                    : chat.user1.name}
                </S.ChatUserName>
                <S.ChatLastMessageTime>
                  {chat.messages.length
                    ? formatDate(chat.messages[0].createdAt)
                    : ' '}
                </S.ChatLastMessageTime>
              </S.ChatContentHeader>

              <S.ChatLastMessage>
                {chat.messages.length ? (
                  chat.messages[0].senderId === loggedUser?.id ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )
                ) : null}
                <span>
                  {chat.messages.length ? chat.messages[0].content : ' '}
                </span>
              </S.ChatLastMessage>
            </S.ChatContent>
          </S.UserChat>
        ))
      )}
    </S.Wrapper>
  );
}
