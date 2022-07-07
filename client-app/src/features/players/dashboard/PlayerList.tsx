import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PlayerList()
{   
    const {playerStore} = useStore();
    const {playersByName, deletePlayer, loading } = playerStore;
    const[target, setTarget] = useState("");

    function handlePlayerDelete(e: SyntheticEvent<HTMLButtonElement>, id: string)
    {
        setTarget(e.currentTarget.name);
        deletePlayer(id);
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {playersByName.map(player =>(
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
                                <Button as={Link} to={`/players/${player.id}`}
                                    floated="right" content="View" 
                                    className="nbu-blue-bg nbu-white" />                                
                                <Button 
                                    name={player.id}
                                    onClick={(e) => handlePlayerDelete(e, player.id)} 
                                    floated="right" content="Delete" 
                                    className="nbu-red-bg nbu-white"
                                    loading={loading && target === player.id} 
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