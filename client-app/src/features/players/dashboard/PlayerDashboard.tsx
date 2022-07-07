import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import PlayerList from "./PlayerList";

export default observer(function PlayerDashboard()
{
    const {playerStore} = useStore();
    const {selectedPlayer, editMode} = playerStore;

    useEffect(() => 
    {
      playerStore.loadPlayers();
    }, [playerStore]);
  
    if(playerStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width="10">
                <PlayerList />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedPlayer && !editMode &&
                    <PlayerDetails />
                }

                {editMode &&
                    <PlayerForm />
                }
            </Grid.Column>
        </Grid>
    )
});