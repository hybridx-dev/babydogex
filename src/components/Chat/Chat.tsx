"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Inter } from 'next/font/google'
import { IoSend } from "react-icons/io5";

const inter = Inter({ subsets: ["latin"] });

const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

const BotBubbleChat = ({text}: {text: string}) => (
  <div className="flex items-center gap-2">
    <Avatar className="self-end">
      <AvatarImage src='/assets/babydoge-nft.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className="px-2 relative py-1 text-sm bg-white break-words text-[#2f2f2f] rounded-xl before:content-[''] before:w-6 before:bg-white max-w-72 before:h-[6px] before:bottom-0 before:absolute before:-translate-x-1/2 before:rounded-tl-full mb-4">{text}</p>
  </div>
)

const HumanBubbleChat = ({text}: {text: string}) => (
  <div className="flex items-center gap-2 ml-auto">
    <p className="px-2 relative py-1 text-sm bg-yellow-500 break-words text-[#2f2f2f] rounded-xl after:content-[''] after:w-6 after:bg-yellow-500 max-w-72 after:h-[6px] after:bottom-0 after:absolute after:-translate-x-1/2 after:rounded-br-full mb-4">{text}</p>
    <Avatar className="self-end">
      <AvatarImage src='/assets/elon.jpg' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
)

export const Chat = () => {
    const [chats, setChats] = useState<{type: 'human' | 'bot', text: string}[]>([]);
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
            addChat(0, 'bot', '.....')
            await wait(1000)
            addChat(0, 'bot', 'Hello!, How can I help you?')
            await wait(1000)
            addChat(1, 'human', 'Why choose HybridX?')
            await wait(500)
            addChat(2, 'bot', '.....')
            await wait(1000)
            const chunkSize = 50;
            const text = `Why choose HybridX? Well, it’s like having a magical wallet that not only stores your treasured NFTs but also lets you effortlessly buy, sell, or swap them in the blink of an eye, thanks to its native liquidity. Want more flexibility? HybridX allows you to transform fungible tokens into unique NFTs and vice versa, on-demand, making it a cake-walk to mint or burn NFTs as you please.

But wait, there’s more! This isn’t just any platform. HybridX is designed with safety goggles on, offering a seamless and secure integration experience. It plays nicely with common standards, ensuring your foray into the digital asset world is as smooth as your favorite jazz record.

And the cherry on top? It treats your crypto wallet like royalty, slashing gas fees by up to an eye-watering 87% compared to the old-school ERC404. Yes, you heard that right! With HybridX, keeping your digital assets humming costs less than a fancy coffee. Now, that’s what we call smart sprinkling of awesomeness into the world of NFTs and fungible tokens`;
            // example response text stream
            let answer = '';
            for (let i = 0; i < text.length; i += chunkSize) {
                const chunk = text.substring(i, i + chunkSize);
                answer += chunk
                // update stream
                addChat(2, 'bot', answer)
                // set delay for sample process
                await wait(500)
            }
          }
        )()
      },
      []
    )
    return ( 
      <div className={`flex flex-col w-full sticky max-w-[30rem] mx-auto top-10 self-start ${inter.className}`}>
        <div className={`h-[30rem] overflow-auto p-4 flex-col-reverse flex gap-2`}>
          {chats.map((v, i) => {
            if(v.type === 'bot'){
              return <BotBubbleChat key={`bot_chat_${i}`} text={v.text}/>
            }else{
              return <HumanBubbleChat key={`human_chat_${i}`} text={v.text}/>
            }
          }).reverse()}
        </div>
        <SendChat/>
        <div className="dot-blue"></div>
      </div>

    );
}

export const SendChat = () => {
  return ( 
    <div className="p-2">
      <div className="bg-[#343334] rounded-lg flex p-3">
        <input placeholder="what you want to ask?" className="flex-grow bg-transparent text-sm ring-0 outline-none"/>
        <IoSend size={25} color="#EAB308"/>
      </div>
    </div>
  );
}