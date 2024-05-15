import { create } from 'zustand';

type State = {
    tab: "Convert" | "Mint NFT" | "Burn NFT"
}

type Action = {
    setTab: (setTab: State['tab']) => void
}

export const useToolTabs = create<State & Action>((set) => ({
    tab: "Convert",
    setTab: (tab) => set(() => ({ tab }))
}))