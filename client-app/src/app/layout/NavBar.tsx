import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

export default function NavBar()
{
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Logo"></img>
                </Menu.Item>
                <Menu.Item name="Players" />
                <Menu.Item>
                    <Button positive content="Create Player" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}