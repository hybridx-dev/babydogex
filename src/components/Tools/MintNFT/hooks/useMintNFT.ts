import { useEffect, useState } from "react";
import { checkFee, minNFT } from "../../../../api";
import { toast } from "react-toastify";
import { type RpcError } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../../../../config";

export const useMintNFT = () => {
    const [amount, setAmount] = useState<undefined | number>();
    const [fee, setFee] = useState(BigInt(0));
    const [loadingMint, setLoadingMint] = useState(false);

    useEffect(() => {
        checkFee().then(setFee);
    }, []);

    const handleMintNFT = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingMint(true);

        try {
            if (amount && fee) {
                const tx = await minNFT(fee, amount);
                await waitForTransactionReceipt(config, {
                    hash: tx,
                    retryDelay: 1500,
                });
                // TODO: update balance;
                setAmount(0);
                toast.success('success');
            }            
        } catch (error) {
            toast.error((error as RpcError).shortMessage);
        }
        finally{
            setLoadingMint(false)
        }
    }

    return {
        amount,
        setAmount,
        fee,
        loadingMint,
        handleMintNFT
    }
}