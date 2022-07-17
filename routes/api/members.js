const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');

const router = express.Router()

// get all Members 
router.get('/', (req, res) => res.json(members))

router.get('/:id', (req, res) => {
    
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: `No Member Found With ID: ${req.params.id}`})
    }
})

router.post('/', (req, res) => {
    const newMenber = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    }
    if (!newMenber.name || !newMenber.email || !newMenber.status ){
        return res.status(400).json({msg: "Please Enter Name, Email and Status"})
    }

    members.push(newMenber)
    res.json(newMenber)

})

module.exports = router