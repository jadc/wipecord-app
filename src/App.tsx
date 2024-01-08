import { useState, Fragment } from "react";

import Accounts from "./accounts-page/Accounts"
import Setup from "./main-page/Setup"
import Log from "./main-page/Log"

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
