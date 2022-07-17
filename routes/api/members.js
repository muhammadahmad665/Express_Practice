const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');

const router = express.Router()

// get all Members 
router.get('/', (req, res) => res.json(members))

// Specific User
router.get('/:id', (req, res) => {
    
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: `No Member Found With ID: ${req.params.id}`})
    }
})

// Post Request
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

//Updating Request
router.put('/:id', (req, res) => {
    
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found){
        const updatedMember = req.body
        members.forEach(member =>{
            if (member.id == req.body.id){
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.email
                member.status = updatedMember.status ? updatedMember.status : member.status
            }
            res.json({msg: "Member is Updated", member})
        })
    }else{
        res.status(400).json({msg: `No Member Found With ID: ${req.params.id}`})
    }
})

// Delete User

router.delete('/:id', (req, res) => {
    
    const found = members.some(member => member.id == req.params.id)

    if (found){
        res.json(members.filter(member => member.id != req.params.id))
    }else{
        res.status(400).json({msg: `No Member Found With ID: ${req.params.id}`})
    }
})
module.exports = router