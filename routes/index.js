// Set up all our routes and controllers 
import express from 'express';
const router = express.Router();

// Simple HTTP request 
const request = require('request'); 

// Simple HTTP Request Useing Promises 
const Q = require('q');
require('any-promise/register/q');
const rp = require('request-promise-any');

router.get('/test', (req, res) => { 
  res.json({
    "name": "John Doe",
    "occupation": "Front End Developer",
    "company": "Brand Value Accelerator"
  });
})

// Write code below



export default router;
