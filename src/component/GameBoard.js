import React, {useContext, useEffect, useState} from 'react';
import DataManager from "../repository/dataManager";
import End from "./End";
import {AppContext} from "./context/contextCreator";

const GameBoard = () => {
    const [deckData, setDeckData] = useState(DataManager.newGame());
    const [page, setPage] = useState('Board');
    const [computerScores, setComputerScores] = useState(0);
    const [playerScores, setPlayerScores] = useState(0);
    const context = useContext(AppContext);

    const countScores = (array) => {
        if (array[0].power > array[1].power) {
            setComputerScores(computerScores + 1);
        } else if (array[0].power < array[1].power) {
            setPlayerScores(playerScores + 1);
        }
    }

    useEffect(() => countScores(deckData), []);

    const nextCards = () => {
        const newDeck = deckData.slice();
        newDeck.splice(0, 2);
        if (newDeck.length > 0) {
            countScores(newDeck);
            setDeckData(newDeck);
        } else {
            setPage('End');
        }
    }

    const cardNameFirst = deckData[0].cardName;
    const cardNameLast = deckData[1].cardName;
    return ((page === 'Board') ?
            <div className="table">
                <div className="flexStart">
                    <div>COMPUTER</div>
                </div>
                <img className="card" src={require(`../imagesCards/${cardNameFirst}.png`)} alt={cardNameFirst}/>
                <div className="redText">{computerScores}-{playerScores}</div>
                <img className="card" src={require(`../imagesCards/${cardNameLast}.png`)} alt={cardNameLast}/>
                <div className="flexRow">
                    <button onClick={() => nextCards()} className="btn">next</button>
                    <div>{context.name}</div>
                </div>
            </div> :
            <End computerSc={computerScores} playerSc={playerScores}/>
    );
};

export default GameBoard;