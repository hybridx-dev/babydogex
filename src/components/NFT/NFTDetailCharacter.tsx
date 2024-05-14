"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Inter } from "next/font/google";
import { MdLabel } from "react-icons/md";
import { BsPersonArmsUp } from "react-icons/bs";

const inter = Inter({subsets: ['latin']});

const ItemTrait = ({header, desc, footer}: {header: string, desc: string, footer: string}) => (
    <div className="bg-[#242424] h-20 p-2 rounded-md gap-1 flex flex-col justify-center items-center">
        <p className="text-xs text-gray-100">{header}</p>
        <p className="font-bold">{desc}</p>
        <p className="text-xs text-gray-100">{footer}</p>
    </div>
)

export const NFTDetailCharacter = () => {
    return ( 
        <div className="flex-shrink-0">
            <Image 
                src={'/assets/babydoge-nft.png'}
                alt="babydoge-nft"
                height={500}
                width={500}
                className="h-[31.3rem] object-contain"/>
            <Accordion type="single" collapsible defaultValue="item-1" className="bg-[#343334]">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="p-4">
                        <div className="flex gap-2 items-center">
                            <MdLabel size={20}/>
                            <p>Traits</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={`p-2 ${inter.className}`}>
                        <div className="grid grid-cols-3 gap-2">
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                            <ItemTrait header="BACKGROUND" desc="Lavender... 3%" footer="Floor: 0.077 ETH"/>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="p-4">
                        <div className="flex gap-2 items-center">
                            <BsPersonArmsUp size={20}/>
                            <p>Personality</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={`p-4 ${inter.className} text-xs break-words w-[30rem]`}>
                        Baby Doge Army is a collection of 10,000 adoptable baby doges. A unique digital art collection waiting to be rescued on the Ethereum Blockchain. Each one has been generated then hand-groomed by our team to be fit for adoption. Join us on our mission and have a good time. Having a Baby Doge grants you creative and commercial rights, as well as inclusion in the community, plus feel great knowing your NFT helped make a difference to save dogs in need.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
     );
}