import React,{useState} from "react";

const MetaMaskInfo = () => {

    const[currentAccount,setCurrentAccount] = useState(undefined)

    const handleAccountsChange = (accounts) => {
        console.log("Accounts Length:" + String(accounts.length))
         if (accounts[0] !== currentAccount){
            setCurrentAccount(accounts[0])
            console.log(currentAccount)
        }

    }

    window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChange)

    window.ethereum.on('accountsChanged', handleAccountsChange)

    if (typeof currentAccount === "undefined") {
        return(
        <p>Connect Metamask</p>)

    }

    


    return(
        <>
        <h3> <span role="img" aria-label="Fox">🦊</span> MetaMask Info</h3>
        <p>Connected Account: {currentAccount}</p>
        </>)




    
}

export default MetaMaskInfo