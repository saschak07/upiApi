const express = require('express')
const User = require('../model/user')
const AccountDetails = require('../model/accoutDetails')
const auth = require('../middleware/auth')
const multer = require('multer')
const customId = require('custom-id')
const router = new express.Router()
const csv =  require('csvtojson')
const fs = require('fs');

router.post('/register',async(req,res) => {
    try{
        const user = new User(req.body)
        user.accountNumber = customId({
            id1: "123456",
            id2: "78910"
        })
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({accountNumber: user.accountNumber,
        userName: user.userName,
        name: user.name
        })
    }catch(e){
        console.log(e)
        res.status(503).send({errorMsg: e.message})
    }

})
router.post('/login',async(req,res) => {
    try{
        const user = await User.findUserByCreds(req.body.userName,req.body.passwd)
        const token  = await user.generateToken()
        res.status(200).send({userName: user.userName, token})
    }catch(e){
        console.log(e)
        res.status(401).send({errorMsg: e.message})
    }

})

router.post('/logout',auth, async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token!==req.token)
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send({errorMsg: e.message})
    }
})
global.__basedir = __dirname;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, file.originalname)
    }
   });
    
   const upload = multer({storage: storage});
    
   router.post('/uploadCsv', auth, upload.single("uploadfile"), async (req, res) =>{
    try{const path = __basedir+'/uploads/'+req.file.filename
    console.log(req.user)
    let creditLimit = 0
    let rateOfInterest = '8.0%'
    let jsonObject =  await csv().fromFile(path)
    
        jsonObject.forEach(async data => {
            const accnt = new AccountDetails()
            accnt.accountNumber = req.user.accountNumber
            accnt.description = data.Description
            accnt.date = new Date(data.Date)
            accnt.withdraw = data.Withdraw
            accnt.deposit = data.Deposit
            accnt.balance = data['Closing Balance']
            await accnt.save()

        })
    fs.unlinkSync(path)
     await AccountDetails.aggregate([{
        $match: {

        }
     },
        {$group: {
            _id :  {month: { $month : "$date" }}
            ,totaldeposits : {$sum : "$deposit"}
        }},
            {
                $addFields:{
                    totalcredits : {$subtract :[ "$balance", "$withdraw"]}
                }
            }
            
        
    ],(err,result) => {
        if(result){
            let monthlyBalnces = []
            result.forEach(data =>{
                monthlyBalnces.push(data.totaldeposits - data.totalcredits)
            })
            console.log(monthlyBalnces)
            creditLimit = monthlyBalnces.reduce((a,b) => a+b,0)/12 * 1.2
        }
        if(err){
            console.log(err)
        }
    })



    res.status(201).send({
        creditLimit: creditLimit,
        rate: rateOfInterest
    });} 
    catch(e){
        console.log(e.message)
        res.status(500).send({errorMsg: e.message})
    }  
    
   });

module.exports = router