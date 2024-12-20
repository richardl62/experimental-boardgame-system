import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { GameDefinition, GameCategory } from "../game-definition";
import "./app.css";
import { GameComponent } from "./game-component";
import { gamePath } from "./url-params";
import { games } from "../games/all-games";

const HomePageStyles = styled.div`
    font-size: 18px;
    h1 {
        font-size: 1.2em;
        font-weight: bold;
    }
    
    h2 {
        margin-top: 0.5em;
        font-size: 18px;
        font-weight: 600;
    }

    margin: 0 0 0 6px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 200%;
  margin-bottom: 0.5em;
`;

interface LinkListProps {
    category: GameCategory;
  }
  
function CategoryLinks(props: LinkListProps) {
    const { category } =  props;
    const selectedGames =  games.filter(game => game.category === category);

    const link = (game: GameDefinition) => {
        const to = {
            pathname: gamePath(game),
            search: window.location.search,
        };

        return <li key={game.name}>
            <Link to={to}>{game.displayName}</Link>
        </li>;
    };

    if(selectedGames.length === 0) {
        return null;
    }

    return <>
        <h2>{category}</h2>
        <ul>
            {selectedGames.map(link)}
        </ul>
    </>;
}

function GameLinks() {
    return (
        <div>
            {Object.values(GameCategory).map((category : GameCategory) =>
                <CategoryLinks key={category}  category={category} />
            )}
        </div>
    );
}

function HomePage() {
    return <HomePageStyles>
        <h1>Available Games</h1>
        <GameLinks />
    </HomePageStyles>;
}

function PageNotFound() {
    return <HomePageStyles>
        <ErrorMessage>404: Page Not Found</ErrorMessage>
        <div>You could try one of these links:</div>
        <GameLinks />
    </HomePageStyles>;
         
}

/**
 * Games App.
 */
function App(): JSX.Element {
    
    useEffect(() => {
        document.title = "Games";
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route key="/" path="/" element={<HomePage />} />

                {games.map(game => <Route
                    key={game.name}
                    path={gamePath(game)}
                    element={<GameComponent game={game}/>}
                />)}

                <Route key="pageNotFound" path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
