import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  bsc,
} from 'wagmi/chains';
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const WOJAX_CONTRACT_ADDRESS_ERC20HX = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS_ERC20HX as `0x${string}`;
export const WOJAX_CONTRACT_ADDRESS_ERC721HX = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS_ERC721HX as `0x${string}`;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: 'BabyDogeX',
  projectId: projectId!,
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [bsc],
  ssr: true,
});

