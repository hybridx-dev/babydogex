import { getBalance, readContract, writeContract } from "wagmi/actions";
import {
  config,
  WOJAX_CONTRACT_ADDRESS_ERC20HX,
  WOJAX_CONTRACT_ADDRESS_ERC721HX,
} from "../config/wagmi";
import { calculationFee } from "../lib";
import { abi as IERC20HX } from "../abi/IERC20HX.json";
import { abi as IFeesOracle } from "../abi/IFeesOracle.json";

export const minNFT = (fee: bigint, amount: number) => {
  return writeContract(config, {
    abi: IERC20HX,
    address: WOJAX_CONTRACT_ADDRESS_ERC20HX,
    functionName: "mintNFT",
    args: [amount],
    value: calculationFee(fee, amount),
  });
};

export const burnNFT = (fee: bigint, nfts: string[]) => {
  return writeContract(config, {
    abi: IERC20HX,
    address: WOJAX_CONTRACT_ADDRESS_ERC20HX,
    functionName: "burnNFT",
    args: [nfts],
    value: calculationFee(fee, nfts.length),
  });
};

export const checkFee = (): Promise<bigint> => {
  return readContract(config, {
    abi: IFeesOracle,
    address: WOJAX_CONTRACT_ADDRESS_ERC20HX,
    functionName: "fee",
    args: [1],
  }) as any;
};


export const checkBalance = async (address: `0x${string}`, addressContract: `0x${string}`) => {
  return getBalance(config, {
    address,
    token: addressContract,
  })
}