import React, {useEffect, useState} from "react"
import {getWeb3, getWallet} from "./utils.js"
import Header from "./Header.js"
import CreateTransactionForm from "./CreateTransactionForm.js"
import TransactionList from "./TransactionList.js"

function App() {
  //read from blockchain
  const [web3, setWeb3] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [accounts, setAccounts] = useState(undefined)
  const [currentAccount, setCurrentAccount] = useState(undefined)
  const [approvers, setApprovers] = useState(undefined)
  const [quorum, setQuorum] = useState(undefined)
  const [transactions, setTransactions] = useState([])


  // #later: difference between useEffect and useState
  useEffect( () =>{
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts()
      const wallet = await getWallet(web3)
      const approvers = await wallet.methods.getApprovers().call()
      const quorum = await wallet.methods.quorum().call()
      const transactions = await wallet.methods.getTransfers().call()
      const currentAddress = await window.ethereum.request({ method: 'eth_requestAccounts'})
      setWeb3(web3);
      setAccounts(accounts)
      setWallet(wallet)
      setApprovers(approvers)
      setQuorum(quorum)
      setTransactions(transactions)
      setCurrentAccount(currentAddress[0])

    };
    init();
  },[])

  const createTransfer =  transfer => {
    wallet.methods
    .createTransfer(transfer.amount, transfer.to)
    .send({from: currentAccount, gas: 1000000})
    console.log("After send")
  }

  const approveTransfer = transferId => {
    wallet.methods.approveTransfer(transferId).send({from:currentAccount, gas:1000000})
  }

  
  if (
    typeof web3 === "undefined" 
    || typeof accounts === "undefined"
    || typeof wallet === "undefined"
    || typeof approvers === "undefined"
    || typeof quorum === "undefined"
    ) 
  {return <div> Loading...</div>}
  




  return (

    <div >
      <h1>MultiSigWallet </h1>
      <p>Connected Account: {currentAccount} </p>
      <h3>Wallet Parameters</h3>
      <Header approvers = {approvers} quorum ={quorum}/>
      <h3>Create Transfer</h3>
      <CreateTransactionForm createTransfer = {createTransfer} />
      <TransactionList transactions = {transactions} approveTransfer = {approveTransfer}/>
    </div>
  );
}

export default App;


