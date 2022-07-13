import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { Event } from "../../../app/models/event";
import { useStore } from "../../../app/stores/store";

interface Props
{
    event: Event
}

export default function EventListItem({event} : Props)
{
    const {eventStore} = useStore();
    const {deleteEvent, loading } = eventStore;
    const[target, setTarget] = useState("");

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }
        
    return (
        <Item key={event.id}>
        <Item.Content>
            <Item.Header as="a">
                {event.title}
            </Item.Header>
            <Item.Description>
                {event.description}
            </Item.Description>
            <Item.Extra>
                <Button as={Link} to={`/events/${event.id}`}
                    floated="right" content="View" 
                    className="nbu-blue-bg nbu-white" />                                
                <Button 
                    name={event.id}
                    onClick={(e) => handleEventDelete(e, event.id)} 
                    floated="right" content="Delete" 
                    className="nbu-red-bg nbu-white"
                    loading={loading && target === event.id} 
                />
                <Label basic content={event.id} />
            </Item.Extra>
        </Item.Content>
    </Item>        
    )
}