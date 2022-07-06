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

    selectPlayer = (id: string) =>
    {
        this.selectedPlayer = this.players.find(p => p.id === id);
    }

    cancelSelectedPlayer = () =>
    {
        this.selectedPlayer = undefined;
    }

    openForm = (id?: string) =>
    {
        id ? this.selectPlayer(id) : this.cancelSelectedPlayer();
        this.editMode = true;
    }

    closeForm = () =>
    {
        this.editMode = false;
    }
}