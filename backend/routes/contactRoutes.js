const express = require("express")
const router = express.Router();
const Contact = require("../models/userModel");

router.route("/").get(async (req,res) => {
    const contacts = await Contact.find();
    res.json(contacts);
})

router.route("/").post(async (req,res) => {
    console.log("Body is : ",req.body);
    const {name, email, phone} = req.body;
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    // res.json({"hello" : 'ok'})
    res.json(contact);
})

router.route("/:id").get(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);    
        throw new Error("Contact not found")
    }
    res.json(contact);
    // res.json({message : `Get contact for ${req.params.id}`});
})

router.route("/:id").put(async (req,res) => {
    res.json({message : `Update contact for ${req.params.id}`});
})

router.route("/:id").delete(async (req,res) => {
    res.json({message : `Delete contact for ${req.params.id}`});
})

module.exports = router;