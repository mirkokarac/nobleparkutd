import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventItem from "./EventItem";

export default observer(function Events()
{   
    const {eventStore} = useStore();
    const {groupedEvents} = eventStore;
  
    return(
        <>
        {groupedEvents.map(([group, events]) => (
            <Fragment key={group}>
                <Header sub color="teal">
                    {group}
                </Header>
                {events.map(event => (
                    <EventItem key={event.id} event={event} />
                ))}              
            </Fragment>
        ))}
        </>
    )
});