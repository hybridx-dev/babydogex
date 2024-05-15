
"use client";

import { useEffect, useState } from "react";
import { Chat, Modal, NFTDetailCharacter } from "../../components";
import { Inter } from "next/font/google";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const inter = Inter({subsets: ['latin']});

export default function AI() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(
    () => {
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    },
    []
  )

  return (
    <div className="flex-grow flex-col-reverse md:flex-row flex justify-between items-center gap-12 z-10 mt-5">
      <NFTDetailCharacter/>
      <Chat/>

      <Modal open={modalOpen} close={() => {}}>
        <div className={`${inter.className} md:w-[20rem] mx-auto text-sm font-bold justify-evenly flex flex-col flex-grow`}>
          <div>
            <h3 className="text-center">Baby<span className="text-yellow-500">Doge</span>X AI is Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy</h3>
            <p className="text-center mt-2">Powered by <a href="https://www.holoworldai.com/" className="text-blue-600">HoloworldAI API</a></p>
          </div>

          <form className="w-full flex mt-5 flex-col gap-4">
            <input placeholder="email" className="w-full p-3 rounded-md text-center"/>
            <Button type="button" className="bg-yellow-500">I want an access!</Button>
            <Link href={'/'} className="text-center text-xs text-gray-300">Back to HybridNFT</Link>
          </form>
        </div>
      </Modal>
    </div>
  );
}
