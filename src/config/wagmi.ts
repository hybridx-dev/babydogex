import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { bsc } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const WOJAX_CONTRACT_ADDRESS_ERC20HX = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS_ERC20HX as `0x${string}`;
export const WOJAX_CONTRACT_ADDRESS_ERC721HX = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS_ERC721HX as `0x${string}`;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const config = defaultWagmiConfig({
  projectId,
  chains: [bsc],
  metadata: {
    name: "My App",
    description: "My app description",
    url: "https://myapp.com",
    icons: ["https://myapp.com/favicon.ico"],
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});
