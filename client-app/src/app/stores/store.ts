import { createContext, useContext } from "react";
import EventStore from "./eventStore";
import PlayerStore from "./playerStore";

interface Store
{
    playerStore: PlayerStore,
    eventStore: EventStore
}

export const store: Store = 
{
    playerStore: new PlayerStore(),
    eventStore: new EventStore()
}

export const StoreContext = createContext(store);

export function useStore()
{
    return useContext(StoreContext);
}