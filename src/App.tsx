import { useState, Fragment } from "react";
import "./App.css";

import Setup from "./Setup"
import Log from "./Log"

function App() {
    const [test, setTest] = useState("");

    return (
        <Fragment>
            <Setup/>
            <Log/>
        </Fragment>
    );
}

export default App;
