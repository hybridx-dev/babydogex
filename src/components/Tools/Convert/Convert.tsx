import { BalanceBabyDoge, BalanceBabyDogeX } from "../../Balance";
import { Button } from "../../ui/button";

export const Convert = () => {
    return ( 
        <div className="p-4 space-y-5">
            <div className="bg-[#343334] rounded-md p-2">
                <h3 className="text-center">My Balance</h3>
                <table className="w-full">
                    <tbody>
                        <tr className="text-gray-200">
                            <td>$BABYDOGE</td>
                            <td className="text-right w-full"><BalanceBabyDoge/></td>
                        </tr>
                        <tr className="text-gray-200">
                            <td>$BABYDOGEX</td>
                            <td className="text-right w-full"><BalanceBabyDogeX/></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <input placeholder="Amount" className="w-full p-2 rounded-md text-black"/>

            <Button className="bg-yellow-500 w-full">Convert to $BABYDOGEX</Button>
        </div>
    );
}