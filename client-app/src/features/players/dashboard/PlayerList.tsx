import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Player } from "../../../app/models/player";
import { useStore } from "../../../app/stores/store";

interface Props
{
    players: Player[];
    deletePlayer: (id: string) => void;
    submitting: boolean;
}

export default observer(function PlayerList({players, 
    deletePlayer, submitting} : Props)
{
    const[target, setTarget] = useState("");

    function handlePlayerDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deletePlayer(id);
    }

    const {playerStore} = useStore();

    return(
        <Segment>
            <Item.Group divided>
                {players.map(player =>(
                    <Item key={player.id}>
                        <Item.Content>
                            <Item.Header as="a">
                                {player.firstName} {player.lastName}
                            </Item.Header>
                            <Item.Meta>{player.position}</Item.Meta>
                            <Item.Description>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => playerStore.selectPlayer(player.id)} 
                                    floated="right" content="View" 
                                    className="nbu-blue-bg nbu-white" />                                
                                <Button 
                                    name={player.id}
                                    onClick={(e) => handlePlayerDelete(e, player.id)} 
                                    floated="right" content="Delete" 
                                    className="nbu-red-bg nbu-white"
                                    loading={submitting && target === player.id} 
                                />
                                <Label basic content={player.position} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});