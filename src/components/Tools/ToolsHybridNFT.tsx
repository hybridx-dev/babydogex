"use client";

import { useAccount } from "wagmi";
import { ComponentProps } from "react";
import { MintNFT } from "./MintNFT";
import { BurnNFT } from "./BurnNFT";
import { useBalance, useToolTabs } from "../../hooks";
import Image from "next/image";

type ToolsItemProps = {
    title: string;
    active: boolean;
} 
const ToolItems = ({active, title, ...props}: ToolsItemProps & ComponentProps<'button'>) => (<button {...props} className={`p-4 hover:text-white rounded ${active ? '' : 'text-gray-500'}`}>{title}</button>)

export const ToolsHybridNFT = () => {
    const account = useAccount();
    const { tab, setTab } = useToolTabs();
    const { balance } = useBalance();

    return ( 
        <div className="relative bg-[#2A272A] text-white rounded-md">
            {!account.isConnected && (
                <div className="absolute inset-0 bg-black/50 rounded-lg backdrop-blur-[1px] flex justify-center items-center">
                    <w3m-button/>
                </div>
            )}

            {account.isConnected && (
                <div className="p-2 flex justify-center">
                    <w3m-button/>
                </div>
            )}

            <div className="flex items-center gap-2 justify-center font-bold">
                {account.isConnected && balance ? (
                    <>
                        <div className="w-7 h-7 bg-white overflow-hidden rounded-full relative">
                            <Image 
                                src={'/assets/babydoge-icon.png'}
                                alt="babydogex"
                                fill={true}
                                className="w-6 md:w-7 object-contain"/>
                        </div>
                        <div>
                            <p className="text-[0.6rem] leading-[0.5rem] text-center">Balance</p>
                            <p>{balance.format} {balance.symbol}</p>
                        </div>
                    </>
                ) : "" }
            </div>

            <div className="flex border-b border-solid border-b-yellow-300 p-2">
                {
                    ["Mint NFT", "Burn NFT"].map((v, i) => (
                        <ToolItems active={v === tab} title={v} key={`item_tool_${i}`} onClick={() => setTab(v as any)}/>
                    ))
                }
            </div>

            {tab === 'Burn NFT' && <BurnNFT/>}
            {tab === 'Mint NFT' && <MintNFT/>}
        </div>
    );
}