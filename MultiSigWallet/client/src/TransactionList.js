import React from "react";

function TransactionList ({transactions,approveTransfer}) {
    return (
        <div>
            <h2>Transfers </h2>
            <table>
                <thead>
                    <tr>
                
                    <th>Transaction Id</th>
                    <th>Address Payable to</th>
                    <th>Amount</th>
                    <th>Approvals</th>
                    <th>Approve</th>
                    <th>Sent</th>
                    </tr>
                </thead>
                    <tbody>
                    {transactions.map(transaction => 
                        <tr key = {transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.approvals}</td>
                            <td><button onClick = {() => approveTransfer(transaction.id)}>Approve</button></td>
                            <td>{transaction.sent ? "Yes" : "No" }</td>
                        </tr>)}
                    </tbody>

            </table>
        </div>
    )
}

export default TransactionList