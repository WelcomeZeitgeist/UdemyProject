import React, {useState} from "react";

function CreateTransactionForm({createTransfer}) {
    
    
    const [transfer,setTransfer] = useState(undefined)

    const handleSubmit = (event) => {
        event.preventDefault()
        createTransfer(transfer)
    }

    const transferUpdate = (e,field) =>{
        const value = e.target.value
        setTransfer({...transfer,[field]: value})
    }



    return (
        <>
        <form onSubmit = {event => handleSubmit(event)}>
            Amount: <input 
            type="text"
            className="form-control"
            onChange = {event => transferUpdate(event,"amount")}/>
            
            To: <input 
            type="text"
            className="form-control"
            onChange = {event => transferUpdate(event,"to")}/>
            <button> Submit </button>


        </form>
        </>
    )


}

export default CreateTransactionForm