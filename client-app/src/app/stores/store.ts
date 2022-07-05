import { createContext, useContext } from "react";
import PlayerStore from "./playerStore";

interface Store
{
    playerStore: PlayerStore
}

export const store: Store = 
{
    playerStore: new PlayerStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}