const {expectRevert} = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const Wallet = artifacts.require("Wallet")

contract("Wallet", (accounts) => {
    let wallet;
    beforeEach(async () => {
        wallet = await Wallet.new([accounts[0],accounts[1],accounts[2]],2);
        await web3.eth.sendTransaction({from: accounts[0],to:wallet.address,value: 1000});
    });


    it("Do we have correct number of approvers and quorum",
    async () => {
        const approvers = await wallet.getApprovers();
        // Checking what addresses are available and who is approver
        // for (let i = 0;i < 5; i++){
        //     console.log("acc "+i+" " + accounts[i])}
        // console.log(approvers)
        const quorum = await wallet.quorum();
        assert(approvers.length === 3);
        assert(approvers[0]===accounts[0]);
        assert(approvers[1]===accounts[1]);
        assert(approvers[2]===accounts[2]);
        assert(quorum.toNumber()===2);
        })
    it("can we create transfer?",
        async () => {
            await wallet.createTransfer(100, accounts[4],{from: accounts[0]})
            const transfers = await wallet.getTransfers();
            assert(transfers.length === 1);
            assert(transfers[0].id === "0");
            assert(transfers[0].amount === "100");
            assert(transfers[0].to === accounts[4]);
            assert(transfers[0].approvals === "0");
            assert(transfers[0].sent === false);
        })
    it("should throw error",
        async() => {
            // #later not sure why I need await. It is already inside of the expectRevert
            await expectRevert(wallet.createTransfer(100, 
                accounts[4],
                {from: accounts[5]}),
                "Only Approved Addresses")
        })
    
    it("Should increase approvers, but not send eth",
        async() => {
            await wallet.createTransfer(100, accounts[4], {from: accounts[0]})
            await wallet.approveTransfer(0, {from: accounts[0]})

            const transfers = await wallet.getTransfers()
            const balance = await web3.eth.getBalance(wallet.address)
            assert(transfers[0].approvals === "1")
            assert(transfers[0].sent === false)
            assert(balance === "1000")
        
        })

        // Happy Path: approve when quorum is reached

    it("should send the payment", 
        async() => {
            const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[4]))
            await wallet.createTransfer(100, accounts[4], {from: accounts[0]})
            await wallet.approveTransfer(0, {from: accounts[0]})
            await wallet.approveTransfer(0, {from: accounts[1]})
            const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[4]))
            const transfers = await wallet.getTransfers()
            const balance = await web3.eth.getBalance(wallet.address)
            assert(transfers[0].approvals === "2")
            assert(transfers[0].sent === true)
            assert(balance === "900")
            assert(balanceAfter.sub(balanceBefore).toNumber()=== 100)
        
        })

        // Unhapy Path: approved by non-approver
    it("should say: Only Approved Addresses",
        async() => {
            await wallet.createTransfer(100, accounts[4], {from: accounts[0]})
            await expectRevert(wallet.approveTransfer(0, {from: accounts[4]}), "Only Approved Addresses")

            const transfers = await wallet.getTransfers()
            const balance = await web3.eth.getBalance(wallet.address)
            assert(transfers[0].approvals === "0")
            assert(transfers[0].sent === false)
            assert(balance === "1000")
        })
        // Unhappy Path: already sent
    it("should say: Transfer already sent",
    async() => {
        await wallet.createTransfer(100, accounts[4], {from: accounts[0]})
        await wallet.approveTransfer(0, {from: accounts[0]})
        await wallet.approveTransfer(0, {from: accounts[1]})
        const transfers = await wallet.getTransfers()
        const balance = await web3.eth.getBalance(wallet.address)
        assert(transfers[0].approvals === "2")
        assert(transfers[0].sent === true)
        assert(balance === "900")
        await expectRevert(wallet.approveTransfer(0, {from: accounts[0]}),"Transfer already sent")

    })

        // Unhappy Path: already approved by this approver
    it("should say: Transfer already approved",
    async() => {
        await wallet.createTransfer(100, accounts[4], {from: accounts[0]})
        await wallet.approveTransfer(0, {from: accounts[0]})
        await expectRevert(wallet.approveTransfer(0, {from: accounts[0]}), "Transfer already approved")

        const transfers = await wallet.getTransfers()
        const balance = await web3.eth.getBalance(wallet.address)
        assert(transfers[0].approvals === "1")
        assert(transfers[0].sent === false)
        assert(balance === "1000")
    })

})