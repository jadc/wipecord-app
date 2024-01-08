import { useState, useEffect, FormEvent, Fragment } from "react";
import SavedAccount from "./SavedAccount";

const ACCOUNTS_KEY: string = "accounts"

type Account = {
    name: string
}

function Accounts(props: {setToken: React.Dispatch<React.SetStateAction<string>>}) {

    const [accounts, setAccounts] = useState<Array<Account>>([])

    // Load accounts from storage
    useEffect(() => {
        let a: string | null = localStorage.getItem(ACCOUNTS_KEY)
        if(a != null) setAccounts(JSON.parse(a))
        else console.error(a)
    }, []);

    // Save accounts to storage if state changes
    useEffect(() => {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    }, [accounts]);

    function onSubmit(e: FormEvent){
        e.preventDefault();
        props.setToken("yes");
    }

    function addAccount(){
        const test: Account = {name: "hi"}
        setAccounts(prev => [...prev, test]);
    }

    return (
        <Fragment>
            <header>
                Login to Discord
            </header>
            <main>
                <ul>
                    {accounts && accounts.map(x => <SavedAccount key={x.name} name={x.name}></SavedAccount>)}
                    <li onClick={addAccount}>Add an account</li>
                </ul>
            </main>
        </Fragment>
    );
}

export default Accounts;
