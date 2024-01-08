import { MouseEvent } from "react";

function SavedAccount(props: {name: string, avatar?: string}) {

    function onSubmit(e: MouseEvent){
        e.preventDefault();
        console.log(e)
    }

    function removeAccount(e: MouseEvent){
        e.preventDefault();
        console.log(e)
    }


    return (
        <div className="saved-account">
            <span onClick={onSubmit}>
                <img src={props.avatar} alt="Avatar"/>
                <p>@{props.name}</p>
            </span>
            <button onClick={removeAccount}>&times;</button>
        </div>
    );
}

export default SavedAccount;
