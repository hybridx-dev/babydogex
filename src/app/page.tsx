import Link from "next/link";
import { ToolsHybridNFT } from "../components";
import { Inter } from 'next/font/google'
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex-grow flex-col md:flex-row flex justify-between items-center gap-12">
      <div className="z-10 p-4 mx-auto">
        <Image 
            src={'/assets/babydoge-icon2.png'}
            alt=""
            height={500}
            width={500}
            className="w-28 object-contain"/>
        <div className="space-y-4 md:w-96">
          <h4 className="font-bold dot-blue text-5xl tracking-wider">Baby<span className="text-yellow-500">Doge</span><span className="text-4xl">X</span></h4>
          <p className={`${inter.className}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link 
              href={"https://dexscreener.com/bsc/0x7be99fa19d8c2c8cefe91712bd559e4edd53bfa8"} 
              target="_blank" 
              className={`bg-white hover:bg-slate-50 px-10 py-2 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md rounded-md`}>
              DexScreener
            </Link>
            <Link
              href={"https://pancakeswap.finance/swap?outputCurrency=0x7A394Cd0D876a8EBdBEd49E13C1Fa4d40e690520"}
              target="_blank" 
              className="bg-[#ff4395] rounded-md px-10 py-2 hover:bg-[#ff4395] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md text-white">
              PancakeSwap
            </Link>
            <Link
              href={"/"}
              target="_blank" 
              className="bg-[#5020e2] px-10 py-2 rounded-md hover:bg-[#5020e2] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 shadow-md text-white">
              Opensea
            </Link>
          </div>
        </div>
      </div>

      <div className={`md:mx-auto w-full md:w-auto bg-black z-10 ${inter.className}`}>
        <div className="md:max-w-[28rem] flex flex-col flex-grow rounded-lg shadow-xl">
          <ToolsHybridNFT/>
        </div>
      </div>
    </div>
  );
}
