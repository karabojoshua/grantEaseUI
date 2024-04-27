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

app.put('/toggleBanOnManyUsers', (req, res) => {
    const accountsToToggleBan = req.body;
    console.log(accountsToToggleBan);
    let query = 'UPDATE `user` SET `banned` = 1 ';
    let placeholders = '';
    let ids = [];

    accountsToToggleBan.forEach( (target, index) => {
        query += 'WHEN id = ?';
        placeholders += '?';
        ids.push(target);
        if (index !== accountsToToggleBan.length - 1) {
            placeholders += ', ';
        }
    });
    query += '';
    connection.query(query, [...ids], (err, result) => {
        if(err) {
            console.error('Error updating fields:', err);
            res.status(500).send('Error updating fields');
        }else {
            console.log('Fields updated successfully');
            res.send('Fields updated successfully');
        }
    });
});

const port = 5000;
app.listen(port, () => {
    console.log('Server running on port '+ port);
});