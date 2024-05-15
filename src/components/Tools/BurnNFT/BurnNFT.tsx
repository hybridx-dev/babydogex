import Image from "next/image";
import { BiLoader } from "react-icons/bi";
import { Button } from "../../ui/button";
import { calculationFee, RGBDataURL } from "../../../lib";
import { useBurnNFT } from "./hooks";
import { formatUnits } from "viem";
import { useToolTabs } from "../../../hooks";

export const BurnNFT = () => {
    const { 
        fee, 
        handleBurnNFT, 
        handleSelectedImage, 
        loadingBurn, 
        loadingNFT, 
        nftsData, 
        selectedNFTs 
    } = useBurnNFT()
    const setTab = useToolTabs((state) => state.setTab);

    const selectedNFTsLength = Object.keys(selectedNFTs).length
    return ( 
        <div className="p-4">
            <div>
                <h3 className="font-bold text-xl">NFTs</h3>
                <span className="text-xs mr-5">
                Selected: {selectedNFTsLength}
                </span>
                <span className="text-xs">
                Fee: {formatUnits(calculationFee(fee, selectedNFTsLength), 18)}
                </span>
            </div>

            <div
                className={`flex-grow my-2 grid ${
                nftsData ? "grid-cols-2" : "place-items-center"
                } gap-4 p-2 h-[15rem] overflow-auto`}
            >
                {nftsData &&
                    nftsData.map((v: any, i: number) => (
                    <Image
                        key={`nft_${i}`}
                        src={v.image}
                        placeholder="blur"
                        blurDataURL={RGBDataURL()}
                        width={150}
                        onClick={() => handleSelectedImage(i, v.id)}
                        className={`${
                            selectedNFTs[i]
                            ? "border-2 rounded border-yellow-500 border-solid p-[3px]"
                            : ""
                        } cursor-pointer`}
                        height={200}
                        alt={'v.name'}
                        />
                ))}
                {/* loader */}
                {!nftsData && loadingNFT && (
                    <div className="">
                        <BiLoader className="animate-spin" size={30} />
                    </div>
                )}
                {!loadingNFT && (!nftsData || !nftsData.length) && (
                    <p className="text-xs text-center">There is no nft that you have, <br/>use <span className="text-yellow-500 cursor-pointer" onClick={() => setTab('Mint NFT')}>Mint NFT</span> to get it</p>
                )}
            </div>

            <Button
                onClick={handleBurnNFT}
                disabled={!selectedNFTsLength || loadingBurn}
                className={`block w-full bg-yellow-500 hover:bg-yellow-600 font-bold p-3 rounded-xl`}
            >
                {loadingBurn ? (
                <BiLoader className="animate-spin mx-auto" size={24} />
                ) : (
                "BURN"
                )}
            </Button>            
        </div>
    );
}