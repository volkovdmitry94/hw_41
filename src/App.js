import './App.css';
import React, {useState} from 'react';
import Start from "./component/Start";
import GameBoard from "./component/GameBoard";
import {AppContext} from "./component/context/contextCreator";

const App = () => {
    const [username, setUsername] = useState(null);

    const changeUserName = (event) => {
        event.preventDefault();
        const name = event.target.nameInput.value;
        setUsername(name);
    }

    return (!username ?
            <Start changeName={changeUserName}/> :
            <AppContext.Provider value={
                {name: username}
            }>
                <GameBoard/>
            </AppContext.Provider>
    );
};

export default App;
