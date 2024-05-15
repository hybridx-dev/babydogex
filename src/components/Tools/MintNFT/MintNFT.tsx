import { formatUnits } from "viem";
import { BalanceBabyDogeX } from "../../Balance";
import { Button } from "../../ui/button";
import { useMintNFT } from "./hooks";
import { calculationFee } from "../../../lib";
import { BiLoader } from "react-icons/bi";

export const MintNFT = () => {
    const { amount, fee, handleMintNFT, loadingMint, setAmount } = useMintNFT();

    return ( 
        <div className="p-4 space-y-2">
            <div className="flex gap-2 text-xs">
                <h3>Balance:</h3>
                <div className="flex gap-1">
                    <BalanceBabyDogeX/>
                    <p>$BABYDOGEX</p>
                </div>
            </div>
            <form className="flex items-center" onSubmit={handleMintNFT}>
                <input 
                    placeholder="Amount to Mint" 
                    name="amount" 
                    type="number" 
                    onChange={(e) => setAmount(+e.target.value)}
                    value={amount || ''}
                    className="flex-grow p-2 rounded-l-md"
                />
                <Button type="submit" disabled={!amount || loadingMint} className={`bg-yellow-500 hover:bg-yellow-600 text-white flex-1 block font-bold p-2 rounded-r-md rounded-l-none`}>
                    {loadingMint ? <BiLoader className="animate-spin mx-auto" size={24}/> : 'MINT'}
                </Button>
            </form>

            <span className="text-xs text-center w-full block font-medium text-white">Fee: {fee && amount ? formatUnits(calculationFee(fee, amount), 18) : ''}</span>
        </div>
    );
}