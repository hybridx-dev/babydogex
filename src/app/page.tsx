import Link from "next/link";
import { ToolsHybridNFT } from "../components";
import { Inter } from 'next/font/google'
import Image from "next/image";
import { Button } from "../components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex-grow flex-col md:flex-row flex justify-between items-center gap-12">
      <div className="z-10 p-4">
        <Image 
            src={'/assets/babydoge-icon2.png'}
            alt=""
            height={500}
            width={500}
            className="w-28 object-contain"/>
        <div className="space-y-4 md:w-96">
          <h4 className="font-bold dot-blue text-5xl tracking-wider">Baby<span className="text-yellow-500">Doge</span><span className="text-4xl">X</span></h4>
          <p className={`${inter.className}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex gap-4 flex-wrap justify-center flex-col md:flex-row">
            <Button className="bg-white hover:bg-slate-50 text-black px-10 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md">
              DexScreener
            </Button>
            <Button className="bg-[#ff4395] hover:bg-[#ff4395] px-10 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md">
              Uniswap
            </Button>
            <Button className="bg-[#5020e2] hover:bg-[#5020e2] px-10 py-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md">
              Opensea
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto z-10">
        <div className="bg-[#2A272A] max-w-[20rem] rounded-lg shadow-xl border border-solid border-gray-700">
          <ToolsHybridNFT/>
        </div>
      </div>
    </div>
  );
}
