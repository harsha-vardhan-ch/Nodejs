const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter'); 


const hostname = 'localhost';
const port = 3000;


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());   /* Allows to parse the body of request message formatte in json */


app.use('/dishes', dishRouter);   /* call dishRouter router when called /dishes endpoint */

app.use('/dishes/:dishID', dishRouter);   /* call dishRouter router when called /dishes/:dishID endpoint */
 
app.use(express.static(__dirname + '/public'));

/* Without Routers */
/* All Operations of /dishes endpoint api  

http://localhost:3000/dishes

*/
/*
app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes',(req,res,next)=>{
    res.end('Will send all the dishes to you!');
    next();
});

app.put('/dishes',(req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
    next();
});

app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    next();
});

app.delete('/dishes',(req,res,next) =>{
    res.end('Deleting all dishes');
    next();
});

*/
/* All Operations of /dishes/:dishID endpoint api 

http://localhost:3000/dishes/23 

In body => Raw => JSON of postman
{
    "name": "Test api",
    "description": "Test for practice"
}

*/

/*
app.all('/dishes/:dishID',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes/:dishID',(req,res,next)=>{
    res.end('Will send details of the dish: ' + req.params.dishID +' to you!');
    next();
})

app.put('/dishes/:dishID',(req,res,next) =>{
    res.write('Updating the dish: ' + req.params.dishID + '\n');
    res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
    next();
});

app.post('/dishes/:dishID',(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishID);
    next();
});

app.delete('/dishes/:dishID',(req,res,next) =>{
    res.end('Deleting dish: ' + req.params.dishID);
    next();
});

-- Index file becomes very large if we add all 5 operations for every endpoint 
So use routers => Seperate file for each endpoint type 

Ex - All the above can be put in dishrouter.js file and can be imported here 
*/

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});