import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemImage, Segment } from "semantic-ui-react";
import { Event } from "../../../app/models/event"
import { useStore } from "../../../app/stores/store";

interface Props 
{
    event: Event;
}

export default function EventItem({event} : Props) 
{     
    const {eventStore} = useStore();
    const {deleteEvent, loading} = eventStore;
    const[target, setTarget] = useState("");

    function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteEvent(id);
    }
        
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <ItemImage size="tiny" circular src="/assets/placeholder.png" />
                        <Item.Content>
                            <Item.Header as={Link} to={`/events/${event.id}`}>{event.title}</Item.Header>
                            <Item.Description>{event.description}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {event.eventDate}
                    <Icon name="marker" /> to be event venue
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{event.description}</span>
                <Button 
                    as={Link} 
                    to={`/events/${event.id}`}
                    color="teal"
                    floated="right"
                    content="View" 
                />
            </Segment>
        </Segment.Group>
    )
};