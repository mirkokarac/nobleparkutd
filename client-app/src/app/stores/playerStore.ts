import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Player } from "../models/player";
import { v4 as uuid } from "uuid";

export default class PlayerStore
{
    playerRegistry = new Map<string, Player>();  
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
            const players = await agent.Players.list();            
            players.forEach(player => {
                this.playerRegistry.set(player.id, player);
            });            
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
        this.selectedPlayer = this.playerRegistry.get(id);
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

    createPlayer = async (player: Player) =>
    {
        this.loading = true;
        player.id = uuid();

        try 
        {
            await agent.Players.create(player);
            runInAction(() => {
                this.playerRegistry.set(player.id, player);
                this.selectedPlayer = player;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) 
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });            
        }
    }

    updatePlayer = async (player:Player) => 
    {
        this.loading = true;

        try
        {
            await agent.Players.update(player);
            runInAction(() => {
                this.playerRegistry.set(player.id, player);
                this.selectedPlayer = player;
                this.editMode = false;
                this.loading = false;                    
            });
        } catch (error) 
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;                    
            });            
        }
    }

    deletePlayer = async (id:string) => 
    {
        this.loading = true;
        try 
        {
            await agent.Players.delete(id);
            runInAction(() => {
                this.playerRegistry.delete(id);                
                if (this.selectedPlayer?.id === id) this.cancelSelectedPlayer();
                this.loading = false;
            }); 
        } catch (error) 
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });    
        }    
    }
}