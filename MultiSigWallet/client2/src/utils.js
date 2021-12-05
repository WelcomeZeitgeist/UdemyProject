// package, need to do npm install
import Web3 from "web3"
// refernce to contract artifact and ABI
// ABI defines functions of the contract 
import Wallet from "./build/contracts/Wallet.json"

// returns web3 object, "new" is JS operator that creates new instance of a class
const getWeb3 = () => {
    return new Web3("HTTP://localhost:7545")
}

// this will create an instance of object, that will allow us to interact with the contract as if it were JS object
//
const getWallet = async web3 => {
    // helpers to get "location" of the contract
    const networkId = await web3.eth.net.getId();
    const contractDeployment = Wallet.networks[networkId];
    // 2 parameters: ABI and contract address (I might be wrong)
    return new web3.eth.Contract(
        Wallet.abi,
        contractDeployment && contractDeployment.address 
    )
}

export {getWeb3, getWallet}