const express = require("express");
const path = require("path");
const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.json(contact);
};

const createContacts = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = new Contact({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  await contact.save();
  res.status(201);
};
const getContact_id = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200);
};

const updateContact_id = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await contact.save();
  res.status(200);
};

const deleteContact_id = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200);
};

module.exports = {
  getContacts,
  getContact_id,
  createContacts,
  updateContact_id,
  deleteContact_id,
};
