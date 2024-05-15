import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { useMintNFT } from "../../MintNFT/hooks";
import { burnNFT, listTokensOfOwner } from "../../../../api";
import { waitForTransactionReceipt } from "wagmi/actions";
import { toast } from "react-toastify";
import { RpcError } from "viem";
import { config, WOJAX_CONTRACT_ADDRESS_ERC721HX } from "../../../../config";

export const useBurnNFT = () => {
    const account = useAccount();
    const chainID = useChainId();
    const [selectedNFTs, setSelectedNFTs] = useState<Record<number, string>>({});
    const [loadingBurn, setLoadingBurn] = useState(false);
    const { fee } = useMintNFT();
  
    const {
      data: nftsData,
      refetch: reloadNFT,
      isLoading,
    } = useQuery({
      queryKey: ["fetchNFT"],
      queryFn: () =>
        listTokensOfOwner(
          "0x9c81870b2a355a206f85e61a80a2e85b501aa213",
          WOJAX_CONTRACT_ADDRESS_ERC721HX,
          chainID
        ),
      enabled: !!account.address && !!chainID,
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
          setSelectedNFTs({});
          await reloadNFT();
          toast.success('success')
          // TODO: update balance
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