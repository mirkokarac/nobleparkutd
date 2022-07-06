import { observer } from "mobx-react-lite";
import { Button, Container, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar()
{
    const {playerStore} = useStore();

    return(
        <Menu inverted className="nbu-blue-bg nbu-white" fixed="top">
            <Container>
                <Menu.Item header>
                    <Icon name='users' size='large' />
                </Menu.Item>
                <Menu.Item name="Players" className="nbu-white" />
                <Menu.Item>
                    <Button 
                        onClick={() => playerStore.openForm()}
                        className="nbu-gold-bg nbu-white" content="Create Player" 
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
});