import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Event } from "../models/event";

export default class EventStore
{
    eventRegistry = new Map<string, Event>();  
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() 
    {
        makeAutoObservable(this);
    }

    get eventsByTitle()
    {
        return Array.from(this.eventRegistry.values())
            .sort((a, b) => a.title.localeCompare(b.title));
    }

    loadEvents = async () =>
    {
        this.setLoadingInitial(true);
        try 
        {
            const events = await agent.Events.list();            
            events.forEach(event => {
                this.setEvent(event);
            });            
            this.setLoadingInitial(false);
            
        } catch (error) 
        {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEvent = async (id: string) =>
    {
        let event = this.getEvent(id);
        if(event)
        {
            this.selectedEvent = event;
            return event;
        } else
        {
            this.setLoadingInitial(true);
            try 
            {
                event = await agent.Events.details(id);
                this.setEvent(event);
                runInAction(() => {
                    this.selectedEvent = event; 
                });                
                this.setLoadingInitial(false);
                return event;
            } catch (error) 
            {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getEvent = (id: string) =>
    {
        return this.eventRegistry.get(id);
    }

    private setEvent = (event: Event) =>
    {
        this.eventRegistry.set(event.id, event);
    }

    setLoadingInitial = (state: boolean) =>
    {
        this.loadingInitial = state;
    }

    createEvent = async (event: Event) =>
    {
        this.loading = true;

        try 
        {
            await agent.Events.create(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
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

    updateEvent = async (event:Event) => 
    {
        this.loading = true;

        try
        {
            await agent.Events.update(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
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

    deleteEvent = async (id:string) => 
    {
        this.loading = true;
        try 
        {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);                
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