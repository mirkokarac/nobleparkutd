import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function PlayerForm()
{
    const {playerStore} = useStore();
    const {createPlayer, updatePlayer, 
        loading, loadPlayer, loadingInitial} = playerStore;
    const {id} = useParams<{id: string}>(); 

    const [player, setPlayer] = useState({
        id: '',
        firstName: '',
        lastName: '',
        position: ''
    });

    useEffect(() => {
        if(id) loadPlayer(id).then(player => setPlayer(player!));
    }, [id, loadPlayer]);

    function handleSubmit()
    {
        player.id ? updatePlayer(player) : createPlayer(player);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target;
        setPlayer({...player, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content="Loading player..." />;

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='First Name' value={player.firstName} name="firstName" 
                    onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={player.lastName} name="lastName"
                    onChange={handleInputChange} />
                <Form.Input placeholder='Position' value={player.position} name="position"
                    onChange={handleInputChange} />
                <Button 
                    loading={loading}
                    floated="right" 
                    positive type="submit" 
                    content="Submit" 
                />
                <Button 
                    floated="right" 
                    type="button" 
                    content="Cancel" 
                />
            </Form>
        </Segment>
    )
});