import { BalanceBabyDoge, BalanceBabyDogeX } from "../../Balance";
import { Button } from "../../ui/button";

export const Convert = () => {
    return ( 
        <div className="p-4 space-y-5">
            <div className="bg-[#343334] rounded-md p-2">
                <h3 className="text-center mb-2">My Balance</h3>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col justify-center items-center text-xs p-2 rounded font-bold bg-black">
                        <h3 className="text-yellow-500">$BABYDOGE</h3>
                        <BalanceBabyDoge/>
                    </div>

                    <div className="flex flex-col justify-center items-center text-xs p-2 rounded font-bold bg-black">
                        <h3 className="text-[#ff4395]">$BABYDOGEX</h3>
                        <BalanceBabyDogeX/>
                    </div>
                </div>
            </div>

            <input placeholder="Amount" type="number" className="w-full p-2 rounded-md"/>

            <Button className="bg-yellow-500 w-full">Convert to <span className="text-[#ff4395] font-semibold ml-2">$BABYDOGEX</span></Button>
        </div>
    );
}