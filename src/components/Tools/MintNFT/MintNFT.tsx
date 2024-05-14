import { BalanceBabyDogeX } from "../../Balance";
import { Button } from "../../ui/button";

export const MintNFT = () => {
    return ( 
        <div className="p-4 space-y-2">
            <div className="flex gap-2 text-xs">
                <h3>Balance:</h3>
                <div className="flex gap-1">
                    <BalanceBabyDogeX/>
                    <p>$BABYDOGEX</p>
                </div>
            </div>
            <form className="flex items-center">
                <input 
                    placeholder="Amount to Mint" 
                    name="amount" 
                    type="number" 
                    className="flex-grow p-2 rounded-l-md"
                />
                <Button type="submit" className={`bg-yellow-500 hover:bg-yellow-600 text-white flex-1 block font-bold p-2 rounded-r-md rounded-l-none`}>
                    MINT
                </Button>
            </form>

            <span className="text-xs text-center w-full block font-medium text-white">Fee: 1000</span>
        </div>
    );
}