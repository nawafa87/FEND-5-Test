projectData = [];

const express = require('express');

const app = express();

const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.listen(6960, function () {
    console.log('Example app listening on port 6960!')
})


app.post('/add',(request,response) =>{
    newEntery = {
        re:request.body
    }
    
    projectData.push(newEntery) 
    console.log('I got a Request!')
    console.log(projectData);
    response.send(projectData);
});
console.log('Hi Nawaf');