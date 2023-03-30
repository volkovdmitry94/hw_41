import React, {useEffect, useState} from 'react';
import GameBoard from "./GameBoard";
import DataManager from "../repository/dataManager";

const End = (props) => {
    const [page, setPage] = useState('End');
    const [finalStatsComputer, setFinalStatsComputer] = useState(DataManager.getPlayerFromLocal().statsComputer);
    const [finalStatsPlayer, setFinalStatsPlayer] = useState(DataManager.getPlayerFromLocal().statsPlayer);

    useEffect(() => {
        if (props.computerSc > props.playerSc) {
            setFinalStatsComputer(finalStatsComputer + 1);
            DataManager.savePlayerToLocal(false);
        } else if (props.computerSc <= props.playerSc) {
            setFinalStatsPlayer(finalStatsPlayer + 1);
            DataManager.savePlayerToLocal(true);
        }
    }, []);

    return ((page === 'End') ?
            <div>
                <div className="table">
                    <div className="redText">
                        {(props.computerSc <= props.playerSc) ? 'Win' : 'Lose'}
                    </div>
                    <div className="redText smaller">Current round:</div>
                    <div className="redText smaller">
                        Computer: {props.computerSc} - Player: {props.playerSc}</div>
                    <div className="redText smaller">Round statistics:</div>
                    <div className="redText smaller">
                        Computer: {finalStatsComputer} - Player: {finalStatsPlayer}</div>
                    <button
                        onClick={() => setPage('Previous')}
                        className="btn">again?
                    </button>
                </div>
            </div> :
            <GameBoard/>
    );
};

export default End;