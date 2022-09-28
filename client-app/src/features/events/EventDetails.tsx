import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";

export default observer(function Event() 
{
    const { eventStore } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial } = eventStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {        
        if (id) loadEvent(id);
    }, [id, loadEvent]);

    if (loadingInitial || !event) return <LoadingComponent />;
    console.log(event)      
    return (
        <Card fluid>
        <Card.Content>
            { <Image src={`/assets/placeholder.png`} style={{marginBottom: "1em"}}></Image> }
            <Card.Header>{event.title}</Card.Header>
            <Card.Meta>
                <span>{event.eventDate}</span>
            </Card.Meta>
            <Card.Description>
                { event.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button
                    as={Link} to={`/events/edit/${event.id}`}          
                    basic color="blue" content='Edit' 
                />
                <Button
                    as={Link} to={`/events`}
                    basic color="grey" content='Cancel' 
                />
            </Button.Group>
        </Card.Content>
  </Card>
    )
});