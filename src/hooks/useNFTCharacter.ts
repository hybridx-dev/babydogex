import { create } from 'zustand';

type State = {
    nft: any
}

type Action = {
    setNFT: (setNFT: State['nft']) => void
}

export const useNFTCharacter = create<State & Action>((set) => ({
    nft: null,
    setNFT: (nft) => set(() => ({ nft }))
}))