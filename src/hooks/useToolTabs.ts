import { create } from 'zustand';

type State = {
    tab: "Mint NFT" | "Burn NFT"
}

type Action = {
    setTab: (setTab: State['tab']) => void
}

export const useToolTabs = create<State & Action>((set) => ({
    tab: "Mint NFT",
    setTab: (tab) => set(() => ({ tab }))
}))