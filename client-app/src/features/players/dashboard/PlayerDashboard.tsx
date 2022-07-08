import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PlayerList from "./PlayerList";

export default observer(function PlayerDashboard()
{
    const {playerStore} = useStore();
    const {loadPlayers, playerRegistry} = playerStore;

    useEffect(() => 
    {
      if (playerRegistry.size <= 1) loadPlayers();
    }, [playerRegistry.size, loadPlayers]);
  
    if(playerStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width="16">
                <PlayerList />
            </Grid.Column>
            <Grid.Column width="6">
                <h2>Player filter</h2>
            </Grid.Column>
        </Grid>
    )
});