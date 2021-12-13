// package, need to do npm install
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
// refernce to contract artifact and ABI
// ABI defines functions of the contract 
import Wallet from "./contracts/Wallet.json"

// returns web3 object, "new" is JS operator that creates new instance of a class

const getWeb3 = () =>

    new Promise( async (resolve, reject) => {
        // detectEthereumProvider: makes sure that MetaMask is loaded
        let provider = await detectEthereumProvider();
        console.log(provider)
        if(provider) {
            // ask user to connect Metamask
            await provider.request({ method: 'eth_requestAccounts' });
            try {
                const web3 = new Web3(window.ethereum);
                console.log(web3)
                resolve(web3);
            } catch(error) {
                reject(error);
            }
        } reject('Install Metamask');

});

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