const express = require('express');
const router  = express.Router();
const {AuthMiddleware} = require('../Authmiddleware');
const { Account } = require('../db');
const mongoose = require('mongoose');

router.get('/balance',AuthMiddleware ,async(req,res)=>{
    try{
        const account = await Account.findOne({
            userId: req.userId
        })
        return res.status(200).json({
            balance: account.balance,
            message: "amount fetched successfulyy"
        })
    }catch(error){
        return res.status(400).json({message:"Some error in getting balace",error});
    }

})


router.post("/transfer", AuthMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


module.exports = router;