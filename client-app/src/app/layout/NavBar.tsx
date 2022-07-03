import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

interface Props 
{
    openForm: () => void;
}

export default function NavBar({openForm} : Props)
{
    return(
        <Menu inverted className="nbu-blue-bg nbu-white" fixed="top">
            <Container>
                <Menu.Item header>
                    <Icon name='users' size='large' />
                </Menu.Item>
                <Menu.Item name="Players" className="nbu-white" />
                <Menu.Item>
                    <Button 
                        onClick={openForm}
                        className="nbu-gold-bg nbu-white" content="Create Player" 
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}