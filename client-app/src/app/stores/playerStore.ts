import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Player } from "../models/player";

export default class PlayerStore
{
    players: Player[] = [];
    selectedPlayer: Player | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() 
    {
        makeAutoObservable(this);
    }

    loadPlayers = async () =>
    {
        this.setLoadingInitial(true);
        try 
        {
            this.players = await agent.Players.list();
            this.setLoadingInitial(false);
            
        } catch (error) 
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }
}