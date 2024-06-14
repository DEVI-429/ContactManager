const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    number,
    user_id:req.user.id
  });
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404); 
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404); 
    throw new Error("Contact not found");
  }

  const { name, email, number } = req.body;
  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.number = number || contact.number;

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("You are not authorized to update this contact");
  }

  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    console.log('Delete request received for ID:', req.params.id);
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
    console.log('Contact not found');
    res.status(404);
    throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to delete this contact");
      }

    await Contact.deleteOne({ _id: req.params.id });
    // console.log('Contact removed:', contact);
    res.status(200).json({ message: "Contact deleted successfully", contact });
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
