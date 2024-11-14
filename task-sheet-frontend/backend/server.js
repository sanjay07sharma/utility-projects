const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let records = [];

// Route to save a record
app.post('/save-record', (req, res) => {
    const newRecord = req.body;
    records.push(newRecord);
    res.status(201).send(newRecord);
});

// Route to clear all records
app.post('/clear-records', (req, res) => {
    records = [];
    res.status(200).send({ message: 'All records cleared' });
});

// Route to take a screenshot (dummy implementation)
app.get('/screenshot', (req, res) => {
    // Dummy image data for demonstration purposes
    const dummyImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAUA' +
        'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
        '//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', 'base64');
    res.set('Content-Type', 'image/png');
    res.send(dummyImage);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});