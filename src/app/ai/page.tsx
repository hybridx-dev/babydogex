
"use client";

import { useState } from "react";
import { Chat, Modal, NFTDetailCharacter } from "../../components";
import { Loader2Icon } from "lucide-react";
import { listTokensOfOwner } from "../../api";
import { useAccount } from "wagmi";
import { WOJAX_CONTRACT_ADDRESS_ERC721HX } from "../../config";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";
import { RGBDataURL } from "../../lib";
import { Button } from "../../components/ui/button";
import { useNFTCharacter } from "../../hooks";
import { useQuery } from "@tanstack/react-query";

export default function AI() {
  const [modalOpen, setModalOpen] = useState(true);
  const { nft, setNFT} = useNFTCharacter();
  const account = useAccount();
  const {
    data: nftData,
    refetch: reloadNFT,
    isLoading: loading,
  } = useQuery({
    queryKey: ["fetchNFT"],
    queryFn: () =>
      listTokensOfOwner(
        account.address,
        WOJAX_CONTRACT_ADDRESS_ERC721HX,
        account.chainId
      ),
    enabled: account.isConnected && !!account.address && !!account.chainId,
    initialData: null,
  });

  return (
    <div className="flex-grow flex-col-reverse md:flex-row flex justify-between items-center gap-12 z-10 mt-5">
      {!loading && nft && (
        <>
          <NFTDetailCharacter/>
          <Chat/>
        </>
      )}

      <Modal open={modalOpen} close={() => {}} className="w-full h-full bg-black/20 backdrop-blur-sm">
        <div className="flex justify-center items-center flex-grow">
          {account.isConnected && (
            <div className="absolute top-2 right-2">
              <w3m-button/>
            </div>
          )}
          {account.isConnected && loading && <Loader2Icon className="animate-spin" size={30}/>}
          {account.isConnected && !loading && !nftData?.length && (
            <p className="text-xl text-center">There is no NFT that you have, <br/>use <Link href={'/'} className="text-yellow-500 cursor-pointer">Mint NFT</Link> to get it</p>
          )}
          {account.isConnected && !loading && nftData && !!nftData.length && (
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-center md:text-xl max-w-[15rem]">Select the character you want to chat with</h1>
              <Carousel
                opts={{
                  align: nftData.length > 2 ? "start" : "center",
                }}
                className={`w-full mx-auto max-w-[10rem] ${nftData.length > 2 ? 'md:max-w-lg lg:max-w-xl' : 'md:max-w-xs'}`}>
                <CarouselContent>
                  {nftData.map((v: any, index) => (
                    <CarouselItem key={`nft_list_ai_${index}`} className={nftData.length > 2 ? "md:basis-1/2 lg:basis-1/3" : ""}>
                        <div className="p-1">
                          <Card className={`overflow-hidden hover:ring-2 hover:ring-yellow-500 ${nft?.id === v.id ? "ring-2 ring-yellow-500" : ""} relative`} onClick={() => setNFT(v)}>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <Image
                                src={v.image}
                                placeholder="blur"
                                blurDataURL={RGBDataURL()}
                                fill={true}
                                className={` cursor-pointer`}
                                alt={v.name}
                                />
                            </CardContent>
                          </Card>
                        </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <Button onClick={() => setModalOpen(false)} className="bg-yellow-500 text-white px-8 py-2 hover:bg-yellow-500" disabled={!nft}>Chat</Button>
            </div>
          )}
          {!account.isConnected && <w3m-button/>}
        </div>
      </Modal>
    </div>
  );
}
