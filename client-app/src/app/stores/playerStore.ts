import { makeObservable, observable } from "mobx";

export default class PlayerStore
{
    firstName = "Mirko Karac";

    constructor() 
    {
        makeObservable(this, {
            firstName: observable
        });
    }
}