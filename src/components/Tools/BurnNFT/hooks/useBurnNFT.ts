import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useMintNFT } from "../../MintNFT/hooks";
import { burnNFT, listTokensOfOwner } from "../../../../api";
import { waitForTransactionReceipt } from "wagmi/actions";
import { toast } from "react-toastify";
import { RpcError } from "viem";
import { config, WOJAX_CONTRACT_ADDRESS_ERC721HX } from "../../../../config";
import { wait } from "../../../../lib";

export const useBurnNFT = () => {
    const account = useAccount();
    const [selectedNFTs, setSelectedNFTs] = useState<Record<number, string>>({});
    const [loadingBurn, setLoadingBurn] = useState(false);
    const { fee, reloadBalance } = useMintNFT();
  
    const {
      data: nftsData,
      refetch: reloadNFT,
      isLoading,
    } = useQuery({
      queryKey: ["fetchNFT"],
      queryFn: () =>
        listTokensOfOwner(
          account.address,
          WOJAX_CONTRACT_ADDRESS_ERC721HX,
          account.chainId
        ),
      enabled: account.isConnected && !!account.address && !!account.chainId,
      initialData: undefined,
    });
  
    const handleSelectedImage = (index: number, tokenId: string) => {
      setSelectedNFTs((prev) => {
        const obj = { ...prev };
        if (!obj[index]) {
          obj[index] = tokenId;
        } else {
          delete obj[index];
        }
        return obj;
      });
    };
  
    const handleBurnNFT = async () => {
      setLoadingBurn(true);
      try {
        const amount = Object.values(selectedNFTs);
        if (amount.length && fee) {
          const result = await burnNFT(fee, amount);
          await waitForTransactionReceipt(config, {
            hash: result,
            retryDelay: 1500,
          });
          await wait(2000);
          await reloadNFT();
          await reloadBalance();
          setSelectedNFTs({});
          toast.success('success')
        }
      } catch (error: any) {
        toast.error((error as RpcError).shortMessage);
      } finally {
        setLoadingBurn(false);
      }
    };
  
    return {
      selectedNFTs,
      nftsData,
      reloadNFT,
      handleBurnNFT,
      handleSelectedImage,
      fee,
      loadingBurn,
      loadingNFT: isLoading,
    };
}