import axios, { AxiosResponse } from "axios";
import { Player } from "../models/player";
import { Event } from "../models/event";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
} 

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body = {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body = {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Players = {
    list: () => request.get<Player[]>("/players"),
    details: (id: string) => request.get<Player>(`/players/${id}`),
    create: (player: Player) => axios.post<void>("/players", player),
    update: (player: Player) => axios.put<void>(`/players/${player.id}`, player),
    delete: (id: string) => axios.delete<void>(`/players/${id}`)
}

const Events = {
    list: () => request.get<Event[]>("/events"),
    details: (id: string) => request.get<Event>(`/events/${id}`),
    create: (event: Event) => axios.post<void>("/events", event),
    update: (event: Event) => axios.put<void>(`/events/${event.id}`, event),
    delete: (id: string) => axios.delete<void>(`/events/${id}`)
}

const agent = {
    Players,
    Events
}

export default agent;