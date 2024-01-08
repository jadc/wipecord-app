import { useState } from "react";

function Log() {
    const data = [{"name":"test1"},{"name":"test2"}];
    const list = data.map(d => <li key={d.name}>{d.name}</li>);
    console.log(list);

    return (
        <fieldset>
            <legend>Log</legend>
            <ul>
                {list}
            </ul>
        </fieldset>
    );
}

export default Log;