import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function PlayerDetails()
{
    const {playerStore} = useStore();
    const {selectedPlayer: player, openForm, 
        cancelSelectedPlayer} = playerStore;

    if (!player) return <LoadingComponent />;

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
                    onClick={cancelSelectedPlayer}
                    basic color="grey" content='Cancel' 
                />
            </Button.Group>
        </Card.Content>
  </Card>
    );
});