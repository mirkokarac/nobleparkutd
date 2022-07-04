import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Player } from "../../../app/models/player";

interface Props
{
    players: Player[];
    selectPlayer: (id: string) => void;
    deletePlayer: (id: string) => void;
}

export default function PlayerList({players, selectPlayer, deletePlayer} : Props)
{
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
                                <Button onClick={() => selectPlayer(player.id)} 
                                    floated="right" content="View" 
                                    className="nbu-blue-bg nbu-white" />                                
                                <Button onClick={() => deletePlayer(player.id)} 
                                    floated="right" content="Delete" 
                                    className="nbu-red-bg nbu-white" />
                                <Label basic content={player.position} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}