import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventListItem from "./EventListItem";

export default observer(function EventList()
{   
    const {eventStore} = useStore();
    const {eventsByName} = eventStore;    
    return(
        <Segment>
            <Item.Group divided>
                {eventsByName.map(event =>(
                    <EventListItem key={event.id} 
                        event={event} />
                ))}
            </Item.Group>
        </Segment>
    )
});