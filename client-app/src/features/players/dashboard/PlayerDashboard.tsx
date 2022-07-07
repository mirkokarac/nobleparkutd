import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import PlayerList from "./PlayerList";

export default observer(function PlayerDashboard()
{
    const {playerStore} = useStore();
    const {selectedPlayer, editMode} = playerStore;
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