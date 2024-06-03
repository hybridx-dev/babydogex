"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Inter } from "next/font/google";
import { MdLabel } from "react-icons/md";
import { BsPersonArmsUp } from "react-icons/bs";
import { useNFTCharacter } from "../../hooks";

const inter = Inter({subsets: ['latin']});

const ItemTrait = ({header, desc, footer}: {header: string, desc: string, footer: string}) => (
    <div className="bg-[#242424] h-20 p-2 rounded-md gap-1 flex flex-col justify-center items-center text-center">
        <p className="text-xs text-gray-100">{header}</p>
        <p className="font-bold">{desc}</p>
        <p className="text-xs text-gray-100">{footer}</p>
    </div>
)

export const NFTDetailCharacter = () => {
    const nft = useNFTCharacter((state) => state.nft);
    return ( 
        <div className="flex-shrink-0 md:w-[30rem] w-full self-start z-[1]">
            <div className="relative md:h-[30rem] h-[20rem] rounded-t-md overflow-hidden">
                <Image 
                    src={nft?.image}
                    alt="babydoge-nft"
                    layout="fill"/>
            </div>
            <Accordion type="single" collapsible defaultValue="item-1" className="bg-[#343334] rounded-b-md">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="p-4">
                        <div className="flex gap-2 items-center">
                            <MdLabel size={20}/>
                            <p>Traits</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={`p-2 ${inter.className}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {nft?.attributes.map((v: any, i: any) => (
                                <ItemTrait key={`atribute_nft_character_${i}`} header={v.trait_type} desc={v.value} footer=""/>
                            ))}
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
                    <AccordionContent className={`p-4 ${inter.className} text-xs`}>
                        -
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
     );
}