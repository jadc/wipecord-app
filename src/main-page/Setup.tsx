import { FormEvent, useState } from "react";
import startWipe from "../Wipe"

function Setup() {

    const [token, setToken] = useState("");

    function onSubmit(e: FormEvent){
        e.preventDefault();
        startWipe(token, "3");
    }

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Setup</legend>
                <p>All information is stored locally.</p>
                <p>
                    <label htmlFor="token">Account</label>
                    <select name="token" id="token">
                        <option value="new">Add an account...</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="guild">Guild</label>
                    <select name="guild" id="guild">
                        <option value="new">Add a guild...</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="target">Target Account</label>
                    <select name="target" id="target">
                        <option value="self">Current account</option>
                        <option value="new">Add an account...</option>
                    </select>
                </p>
            </fieldset>
        </form>
    );
}

export default Setup;