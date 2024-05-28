import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useAccount } from "wagmi"
import { formatUnits } from "viem";
import { WOJAX_CONTRACT_ADDRESS_ERC20HX } from "../config";
import { checkBalance } from "../api";

export const useBalance = () => { 
    const account = useAccount();
    const [contractAddress, setContractAddress] = useState<`0x${string}`>(WOJAX_CONTRACT_ADDRESS_ERC20HX)
    const {
        data: balance,
        refetch: reloadBalance,
        isLoading,
      } = useQuery({
        queryKey: ["checkBalance"],
        queryFn: () => checkBalance(account.address!, contractAddress!),
        initialData: undefined,
        enabled: account.isConnected && !!account.address && !!contractAddress
    });
    return {
        contractAddress,
        setContractAddress,
        balance: balance ? {
            ...balance,
            format: formatUnits(balance.value, balance.decimals)
        } : undefined,
        reloadBalance,
        state: isLoading ? 'loading' : 'finish'
    }
}