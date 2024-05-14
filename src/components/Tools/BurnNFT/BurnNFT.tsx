import Image from "next/image";
import { BiLoader } from "react-icons/bi";
import { Button } from "../../ui/button";
import { RGBDataURL } from "../../../lib/utils";

export const BurnNFT = () => {
    return ( 
        <div className="p-4">
            <div>
                <h3 className="font-bold text-xl">NFTs</h3>
                <span className="text-xs mr-5">
                Selected: 0
                </span>
                <span className="text-xs">
                Fee: 1000
                </span>
            </div>

            <div
                className={`flex-grow grid ${
                true ? "grid-cols-2" : "place-items-center"
                } gap-4 p-2 h-[15rem] overflow-auto`}
            >
                {Array(10).fill({}).map((v, i) => (
                    <Image
                        key={`nft_${i}`}
                        src={`https://ipfs.io/ipfs/QmcJygK3B27ZnebsPjZ5DDJF4G5FhTPJcQHqc4mm743Su5/${i}.png`}
                        placeholder="blur"
                        blurDataURL={RGBDataURL()}
                        width={150}
                        // onClick={() => handleSelectedImage(i, v.id)}
                        className={`${
                            false
                            ? "border-2 h-10 object-contain rounded border-[#ED5E93] border-solid p-[3px]"
                            : ""
                        } cursor-pointer`}
                        height={200}
                        alt={'v.name'}
                        />
                ))}
                {/* loader */}
                {/* {!nftsData && loadingNFT && (
                <div className="">
                    <BiLoader className="animate-spin" size={30} />
                </div>
                )} */}
            </div>

            <Button
                className={`block w-full bg-yellow-500 hover:bg-yellow-600 font-bold p-3 rounded-xl`}
            >
                {false ? (
                <BiLoader className="animate-spin mx-auto" size={24} />
                ) : (
                "BURN"
                )}
            </Button>            
        </div>
    );
}