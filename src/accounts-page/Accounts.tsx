import { useState, useEffect, FormEvent, Fragment } from "react";

const ACCOUNTS_KEY: string = "accounts"

type Account = {
    name: string,
    avatar?: string,
    token: string
}

function Accounts(props: {setToken: React.Dispatch<React.SetStateAction<string>>}) {

    const [accounts, setAccounts] = useState<Array<Account>>([])

    // Load accounts from storage
    // TODO: this doesn't work
    useEffect(() => {
        let a: string | null = localStorage.getItem(ACCOUNTS_KEY)
        if(a != null) setAccounts(JSON.parse(a))
        else console.error(a)
    }, []);

    // Save accounts to storage if state changes
    useEffect(() => {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    }, [accounts]);

    // TODO: account adding modal
    function addAccount(account: Account){
        setAccounts(prev => [...prev, account]);
    }

    function selectAccount(account: Account){
        console.log("Select " + account.name)
    }

    function removeAccount(account: Account){
        console.log("Delete " + account.name)
        setAccounts(accounts.filter(x => x.name !== account.name));
    }

    return (
        <Fragment>
            <header>
                Login to Discord
            </header>
            <main>
                <ul>
                    {accounts && accounts.map(x => 
                        <Fragment>
                            <div className="saved-account">
                                <span onClick={() => selectAccount(x)}>
                                    <img src={x.avatar} alt="Avatar"/>
                                    <p>@{x.name}</p>
                                </span>
                                <button onClick={() => removeAccount(x)}>&times;</button>
                            </div>
                        </Fragment>
                    )}
                    <li onClick={() => {addAccount({name: "hi", token: "2"})}}>Add an account</li> 
                </ul>
            </main>
        </Fragment>
    );
}

export default Accounts;