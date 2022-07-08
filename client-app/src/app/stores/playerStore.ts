import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Player } from "../models/player";

export default class PlayerStore
{
    playerRegistry = new Map<string, Player>();  
    selectedPlayer: Player | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() 
    {
        makeAutoObservable(this);
    }

    get playersByName()
    {
        return Array.from(this.playerRegistry.values())
            .sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    loadPlayers = async () =>
    {
        this.setLoadingInitial(true);
        try 
        {
            const players = await agent.Players.list();            
            players.forEach(player => {
                this.setPlayer(player);
            });            
            this.setLoadingInitial(false);
            
        } catch (error) 
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPlayer = async (id: string) =>
    {
        let player = this.getPlayer(id);
        if(player)
        {
            this.selectedPlayer = player;
            return player;
        } else
        {
            this.setLoadingInitial(true);
            try 
            {
                player = await agent.Players.details(id);
                this.setPlayer(player);
                runInAction(() => {
                    this.selectedPlayer = player; 
                });                
                this.setLoadingInitial(false);
                return player;
            } catch (error) 
            {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getPlayer = (id: string) =>
    {
        return this.playerRegistry.get(id);
    }

    private setPlayer = (player: Player) =>
    {
        this.playerRegistry.set(player.id, player);
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }

    createPlayer = async (player: Player) =>
    {
        this.loading = true;

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