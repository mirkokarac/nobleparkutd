import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import Events from "./Events";

export default observer(function EventDashboard()
{
    const {eventStore} = useStore();
    const {loadEvents, eventRegistry} = eventStore;

    useEffect(() => 
    {
      if (eventRegistry.size <= 1) loadEvents();
    }, [eventRegistry.size, loadEvents]);
  
    if(eventStore.loadingInitial) return <LoadingComponent content='Loading events' />

    return(
        <Grid>
            <Grid.Column width="10">
                <Events />
            </Grid.Column>
            <Grid.Column width="6">
                <h2>Event filter</h2>
            </Grid.Column>
        </Grid>
    )
});