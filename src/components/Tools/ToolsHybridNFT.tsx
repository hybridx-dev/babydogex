"use client";

import { useAccount } from "wagmi";
import { Convert } from "./Convert";
import { ComponentProps, useState } from "react";

type ToolsItemProps = {
    title: string;
    active: boolean;
} 
const ToolItems = ({active, title, ...props}: ToolsItemProps & ComponentProps<'button'>) => (<button {...props} className={`p-4 hover:text-white rounded ${active ? '' : 'text-gray-500'}`}>{title}</button>)

export const ToolsHybridNFT = () => {
    const account = useAccount();
    const [tab, setTab] = useState<"Convert" | "Mint NFT" | "Burn NFT">("Convert")

    return ( 
        <div className="relative">
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

            <div className="flex border-b border-solid border-b-yellow-500 p-2">
                {
                    ["Convert", "Mint NFT", "Burn NFT"].map((v, i) => (
                        <ToolItems active={v === tab} title={v} key={`item_tool_${i}`} onClick={() => setTab(v as any)}/>
                    ))
                }
            </div>

            {tab === 'Convert' && <Convert/>}
            {tab === 'Burn NFT' && <p>burn</p>}
            {tab === 'Mint NFT' && <p>mint</p>}
        </div>
    );
}