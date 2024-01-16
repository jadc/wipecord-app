import { FormEvent, useState, useEffect, useRef, Fragment } from "react";
import { fetchUser } from "./API"

const ACCOUNTS_KEY: string = "accounts"

type Account = {
    id: string,
    name: string,
    avatar?: string,
    token: string
}

function Accounts(props: {setToken: React.Dispatch<React.SetStateAction<string>>}) {

    const modalRef = useRef<HTMLDialogElement>(null)

    // TODO: put this as usecontext to access outside login page
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

    async function addAccount(e: FormEvent){
        if( e.target instanceof HTMLFormElement ){
            const data = new FormData(e.target);

            // Get user data from token
            const token = data.get("token") as string
            const req = await fetchUser(token)
            console.log(req)

            const newAccount: Account = {
                id: req["id"],
                name: req["username"], 
                token: token,
                avatar: `https://cdn.discordapp.com/avatars/${req["id"]}/${req["avatar"]}`
            }
            setAccounts(prev => [...prev, newAccount]);
        }
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
                </ul>
                <button onClick={() => modalRef.current?.showModal()}>Add an account</button> 
                
                <dialog ref={modalRef} onSubmit={addAccount}>
                    <form method="dialog">
                        <fieldset>
                            <legend>Login</legend>
                            <p>All information is stored locally.</p>
                            <p>
                                <label htmlFor="token">Token</label>
                                <input name="token" id="token" required/>
                            </p>
                            <button type="submit">Login</button>
                            <button type="button" onClick={() => modalRef.current?.close()}>Cancel</button>
                        </fieldset>
                    </form>
                </dialog>
            </main>
        </Fragment>
    );
}

export default Accounts;