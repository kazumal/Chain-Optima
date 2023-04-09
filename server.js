const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.json());
app.use(express.static('public'));

app.post('/execute', (req, res) => {
    const command = req.body.command;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(stderr);
        } else {
            res.send(stdout);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
