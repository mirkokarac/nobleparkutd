import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Player } from "../../../app/models/player";
import { useStore } from "../../../app/stores/store";

interface Props
{
    createOrEdit: (player: Player) => void;
    submitting: boolean;
}

export default observer(function PlayerForm({createOrEdit, 
    submitting} : Props)
{
    const {playerStore} = useStore();
    const {selectedPlayer, closeForm} = playerStore;    

    const initialState = selectedPlayer ?? {
        id: '',
        firstName: '',
        lastName: '',
        position: ''
    }

    const [player, setPlayer] = useState(initialState);

    function handleSubmit()
    {
        createOrEdit(player);
        console.log(player);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target;
        setPlayer({...player, [name]:value})
    }

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
                    loading={submitting}
                    floated="right" 
                    positive type="submit" 
                    content="Submit" 
                />
                <Button 
                    onClick={closeForm}
                    floated="right" 
                    type="button" 
                    content="Cancel" 
                />
            </Form>
        </Segment>
    )
});