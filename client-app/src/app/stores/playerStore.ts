import { makeAutoObservable } from "mobx";

export default class PlayerStore
{
    firstName = "Mirko Karac";

    constructor() 
    {
        makeAutoObservable(this);
    }

    setFirstName = () => 
    {
        this.firstName = this.firstName  + "!";
    }
}