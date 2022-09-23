import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function Home()
{
    return(
        <Container style={{marginTop: "7em"}}>
            <h1>Home</h1>
            <h3>Go to <Link to={`/players`}>players</Link></h3>
            <h3>Go to <Link to={`/events`}>events</Link></h3>
        </Container>
    )
}