import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

export default observer(function NavBar()
{
    return(
        <Menu inverted className="nbu-blue-bg nbu-white" fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact='true' header>
                    <Icon name='users' size='large' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/players' name="Players"
                    className="nbu-white" exact='true' />
                <Menu.Item>
                    <Button as={NavLink} to='/players/create' exact='true'
                        className="nbu-gold-bg nbu-white" content="Create Player" 
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
});