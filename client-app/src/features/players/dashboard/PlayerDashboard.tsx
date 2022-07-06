import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { Player } from "../../../app/models/player";
import { useStore } from "../../../app/stores/store";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import PlayerList from "./PlayerList";

interface Props
{
    players: Player[];
    createOrEdit: (player: Player) => void;
    deletePlayer: (id: string) => void;
    submitting: boolean;
}

export default observer(function PlayerDashboard({players,
    createOrEdit, deletePlayer, submitting} : Props)
{
    const {playerStore} = useStore();
    const {selectedPlayer, editMode} = playerStore;
    return(
        <Grid>
            <Grid.Column width="10">
                <PlayerList 
                    players={players}
                    deletePlayer={deletePlayer}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedPlayer && !editMode &&
                    <PlayerDetails />
                }

                {editMode &&
                    <PlayerForm 
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
});