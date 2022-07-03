import React from "react";
import { Grid } from "semantic-ui-react";
import { Player } from "../../../app/models/player";
import PlayerDetails from "../details/PlayerDetails";
import PlayerForm from "../form/PlayerForm";
import PlayerList from "./PlayerList";

interface Props
{
    players: Player[];
    selectedPlayer: Player | undefined;
    selectPlayer: (id: string) => void;
    cancelSelectPlayer: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (player: Player) => void;
    deletePlayer: (id: string) => void;
}

export default function PlayerDashboard({players, selectedPlayer,
    selectPlayer, cancelSelectPlayer, editMode,
    openForm, closeForm, createOrEdit, deletePlayer} : Props)
{
    return(
        <Grid>
            <Grid.Column width="10">
                <PlayerList 
                    players={players} 
                    selectPlayer={selectPlayer}
                    deletePlayer={deletePlayer}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedPlayer && !editMode &&
                    <PlayerDetails 
                        player={selectedPlayer}
                        cancelSelectPlayer={cancelSelectPlayer} 
                        openForm={openForm}
                    />
                }

                {editMode &&
                    <PlayerForm 
                        player={selectedPlayer} 
                        closeForm={closeForm}
                        createOrEdit={createOrEdit}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}