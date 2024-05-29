import { formatUnits } from "viem";
import { Button } from "../../ui/button";
import { useMintNFT } from "./hooks";
import { calculationFee } from "../../../lib";
import { BiLoader } from "react-icons/bi";

export const MintNFT = () => {
    const { amount, fee, handleMintNFT, loadingMint, setAmount, balance } = useMintNFT();
    const isInsufficient = balance && amount ? amount > +balance.format : false;
    return ( 
        <div className="p-4 space-y-2 self-start">
            <form className="flex items-center" onSubmit={handleMintNFT}>
                <input 
                    placeholder="Amount to Mint" 
                    name="amount" 
                    type="number" 
                    onChange={(e) => setAmount(+e.target.value)}
                    value={amount || ''}
                    className="flex-grow p-2 rounded-l-md focus:outline-none"
                />
                <Button type="submit" disabled={!amount || loadingMint || isInsufficient} className={`bg-yellow-500 hover:bg-yellow-600 text-white flex-1 block font-bold p-2 rounded-r-md rounded-l-none`}>
                    {loadingMint ? <BiLoader className="animate-spin mx-auto" size={24}/> : 'MINT'}
                </Button>
            </form>
            {isInsufficient && <p className="text-red-400 animate-pulse text-xs font-bold text-center">Insufficient balance</p>}
            {fee && !!amount && <span className="text-xs text-center w-full block font-medium text-white">Fee: {formatUnits(calculationFee(fee, amount), 18)}</span>} 
        </div>
    );
}