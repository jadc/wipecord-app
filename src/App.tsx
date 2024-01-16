import { useState, Fragment } from "react";

import Accounts from "./Accounts"
import Setup from "./Setup"
import Log from "./Log"

function App() {
    // TODO: set to last used token from localStorage
    const [token, setToken] = useState("");

    if(!token) return (<Accounts setToken={setToken}/>);

    return (
        <Fragment>
            <Setup/>
            <Log/>
        </Fragment>
    );
}

export default App;
