import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Player } from "../models/player";

export default class PlayerStore
{
    players: Player[] = [];
    selectedPlayer: Player | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() 
    {
        makeAutoObservable(this);
    }

    loadPlayers = async () =>
    {
        this.loadingInitial = true;
        try 
        {
            this.players = await agent.Players.list();            
            this.loadingInitial = false;
        } catch (error) 
        {
            console.log(error);
            this.loadingInitial = false;
        }
    }
}