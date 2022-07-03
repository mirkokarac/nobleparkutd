import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Player } from "../../../app/models/player";

interface Props 
{
    player: Player;
    cancelSelectPlayer: () => void;
    openForm: (id: string) => void;
}

export default function PlayerDetails({player, cancelSelectPlayer, openForm} : Props)
{
    return(
    <Card fluid>
        <Card.Content>
            <Image src={`/assets/user.png`} style={{marginBottom: "1em"}}></Image>
            <Card.Header>{player.firstName} {player.lastName}</Card.Header>
            <Card.Meta>
                <span>{player.position}</span>
            </Card.Meta>
            <Card.Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button 
                    onClick={() => openForm(player.id)}
                    basic color="blue" content='Edit' 
                />
                <Button 
                    onClick={cancelSelectPlayer}
                    basic color="grey" content='Cancel' 
                />
            </Button.Group>
        </Card.Content>
  </Card>
    );
}