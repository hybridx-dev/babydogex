
import { Chat, NFTDetailCharacter } from "../../components";

export default function AI() {
  return (
    <div className="flex-grow flex-col-reverse md:flex-row flex justify-between items-center gap-12 z-10 mt-5">
      <NFTDetailCharacter/>
      <Chat/>
    </div>
  );
}
