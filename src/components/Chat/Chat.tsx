"use client";

import { Fragment, PropsWithChildren, useEffect, useRef, useState } from "react";
import { wait } from '../../lib'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Inter } from 'next/font/google'
import { IoSend } from "react-icons/io5";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "../../app/ai/action";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { useNFTCharacter } from "../../hooks";

const inter = Inter({ subsets: ["latin"] });


const MarkdownContent = styled.div`
  /* Styles for the markdown content */
  line-height: 1.6;
  word-wrap: break-word;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0;
  }

  strong {
    margin: 10px 0;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    font-family: monospace;
    background-color: #f8f8f8;
    padding: 2px 5px;
    border-radius: 3px;
  }

  pre {
    padding: 10px;
    border-radius: 3px;
    overflow-x: auto;
  }

  pre code {
    background-color: transparent;
    padding: 0;
    color: white;
  }

  blockquote {
    margin: 10px 0;
    padding-left: 10px;
    border-left: 3px solid #d3d3d3;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol {
    margin: 10px 0;
    padding-left: 20px;
    font-size: 16px;
  }

  table {
    --tw-border-opacity: 1;
    border-color: rgba(142, 142, 160, var(--tw-border-opacity));
    border-collapse: collapse;
    width: 100%;
    border: 0 solid #d9d9e3;
    box-sizing: border-box;
  }

  th,
  td {
    border: 1px solid #d9d9e3; /* Adjust to match your design */
    padding: 0.5rem;
  }

  th {
    background-color: rgba(236, 236, 241, 0.2);
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-width: 1px;
    padding: 0.25rem 0.75rem;
  }

  th:first-child {
    border-top-left-radius: 0.375rem;
  }

  th:last-child {
    border-right-width: 1px;
    border-top-right-radius: 0.375rem;
  }

  td {
    border-bottom-width: 1px;
    border-left-width: 1px;
    padding: 0.25rem 0.75rem;
  }

  td:last-child {
    border-right-width: 1px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.375rem;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.375rem;
  }

  a {
    text-decoration-line: underline;
    text-underline-offset: 2px;
    color: #6326fa;
  }
`;

export const BotBubbleChat = ({text, children}: {text?: string} & PropsWithChildren) => {
  const nft = useNFTCharacter((state) => state.nft);
  return (
    <div className="flex items-center gap-2">
      <Avatar className="self-end">
        <AvatarImage src={nft?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="px-2 relative py-1 text-sm bg-white break-words text-[#2f2f2f] rounded-xl before:content-[''] before:w-6 before:bg-white max-w-72 before:h-[6px] before:bottom-0 before:absolute before:-translate-x-1/2 before:rounded-tl-full mb-4">
        {text && (
          <MarkdownContent>
            <ReactMarkdown className={'space-y-3'}
              remarkPlugins={[remarkGfm]}
            >
              {text}
            </ReactMarkdown>
          </MarkdownContent>
        )}
        {children}
      </div>
    </div>
  )
}

export const HumanBubbleChat = ({text, children}: {text?: string} & PropsWithChildren) => (
  <div className="flex items-center gap-2 ml-auto">
    <div className="px-2 relative py-1 text-sm bg-yellow-500 break-words text-[#2f2f2f] rounded-xl after:content-[''] after:w-6 after:bg-yellow-500 max-w-72 after:h-[6px] after:bottom-0 after:absolute after:-translate-x-1/2 after:rounded-br-full mb-4">
      {text}
    </div>
    <Avatar className="self-end">
      <AvatarImage src='/assets/elon.jpg' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
)

export const Chat = () => {
    const [chats, setChats] = useState<{type: 'human' | 'bot', text: string}[]>([]);
    const [messages, setMessages] = useUIState<typeof AI>();

    const addChat = (id: number, type: 'human' | 'bot', text: string) => {
      setChats((prev) => {
        const clone = [...prev];
        clone[id] = {
          text,
          type
        }
        return clone;
      })
    }

    useEffect(
      () => {
        (
          async () => {
            setMessages(currentMessages => [
              {
                id: Date.now(),
                display: <BotBubbleChat text={"Woof woof! Hii hooman! 🐶 Wanna play fetch or chase our tails? So excited! Eeee!"}/>,
              },
            ]);
          }
        )()
      },
      []
    )

    return ( 
      <div className={`flex flex-col w-full md:sticky max-w-[30rem] mx-auto top-10 self-start ${inter.className}`}>
        <div className="p-4 h-[20rem] md:h-[30rem] flex-col-reverse flex gap-2 overflow-auto">
          {messages.map((v, i) => (
            <Fragment key={`bot_chat_${i}`}>
              {v.display}
            </Fragment>
          )).reverse()}
        </div>
        <SendChat/>
        <div className="dot-blue"></div>
      </div>

    );
}

export const SendChat = () => {
  const { submitUserMessage } = useActions<typeof AI>();
  const [_, setMessages] = useUIState<typeof AI>();
  const refForm = useRef<HTMLFormElement>(null);

  return ( 
    <div className="p-2">
      <form className="bg-[#343334] rounded-lg flex p-3" ref={refForm} onSubmit={
        async (e) => {
          e.preventDefault();
          const teks = (e.target as any).chat.value;
          setMessages(currentMessages => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <HumanBubbleChat text={teks}/>,
            },
          ]);
          const responseBot = await submitUserMessage(teks)
          setMessages(currentMessages => [
            ...currentMessages,
            responseBot
          ]);
          refForm.current?.reset();
        }
      }>
        <input placeholder="what you want to ask?" type="text" name="chat" className="flex-grow bg-transparent text-sm ring-0 outline-none"/>
        <IoSend size={25} color="#EAB308"/>
      </form>
    </div>
  );
}