// Import express for our server 
import express from 'express'; 
import routes from './routes/index';

// Initialize our express server 
const app = express(); 

// Set app port to listen on localhost:3000
const port = process.env.PORT || 3000;

app.use('/', routes);

export default app; 