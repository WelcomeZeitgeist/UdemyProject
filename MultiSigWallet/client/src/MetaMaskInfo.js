import React,{useState} from "react";

const MetaMaskInfo = ({currentAddress, setCurrentAddress}) => {

    const handleAccountsChange = (accounts) => {
        console.log("Accounts Length:" + String(accounts.length))
         if (accounts[0] !== currentAddress){
            setCurrentAddress(accounts[0])
            console.log(currentAddress)
        }

    }

    window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChange)

    window.ethereum.on('accountsChanged', handleAccountsChange)

    if (typeof currentAddress === "undefined") {
        return(
        <p>Connect Metamask</p>)

    }

    


    return(
        <>
        <h3> <span role="img" aria-label="Fox">🦊</span> MetaMask Info</h3>
        <p>Connected Account: {currentAddress}</p>
        </>)
}
export default MetaMaskInfo