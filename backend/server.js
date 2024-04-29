const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fundvortex'
});

connection.connect((err) => {
    if(err) {
        console.log('didnt connect' + err.stack);
        return;
    }
    console.log('Connected to database as id'+connection.threadId);
});

app.get('/users', (req,res) => {
    const query = 'SELECT * FROM user';

    connection.query(query, (err,results) => {
        if (err) {
            console.log('Error querying database: '+err.stack);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.json(results);
    });
});

app.get('/fund_manager_requests', (req,res) => {
    const query = 'SELECT * FROM `fund_manager_requests`';

    connection.query(query, (err,results) => {
        if (err) {
            console.log('Error querying database: '+err.stack);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.json(results);
    });
});

app.put('/toggleBanOnUser', (req, res) => {
    const { id, toggleBan } = req.body;
    console.log(req.body);
    if (req.body !== undefined){
        const query = "UPDATE `user` SET `banned` = ? WHERE `user`.`id` = ?";
        connection.query(query, [toggleBan, id], (err, result) => {
            if (err) {
                console.error('Error updating field:banned', err);
                res.status(500).send('Error updating field');
            }else {
                console.log('Account id: '+ id +' unbanned/activated successfully');
                res.send('Field updated successfully');
            }
        });
    } else {
        console.log("req.body is undefined");
        res.status(500).send('Error updating field, No ID was provided');
    }
    
});

app.put('/approveFundManager', (req, res) => {
    const { id } = req.body;
    if (req.body !== undefined){
        const query = "UPDATE `user` SET `role` = 'fund_manager' WHERE `user`.`id` = ?";
        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Error updating field: role', err);
                res.status(500).send('Error updating field');
            }else {
                console.log('Account id: '+ id +' upgraded to Fund Manager successfully');
                res.send('Field updated successfully');
            }
        });
    } else {
        console.log("req.body is undefined");
        res.status(500).send('Error updating field, No ID was provided');
    }
    
});

const port = 5000;
app.listen(port, () => {
    console.log('Server running on port '+ port);
});