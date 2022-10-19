import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function Home()
{
    return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
                    Noble Park United
                </Header>
                <Header as="h2" inverted content="Welcome to Noble Park United" />
                <Button as={Link} to="/events" size="huge" inverted>Take me to events</Button>
                <Button as={Link} to="/players" size="huge" inverted>Take me to players</Button>
            </Container>
        </Segment>
    )
}