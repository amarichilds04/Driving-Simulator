const express = require('express'); // establish express
const path = require('path') // path to connect to frontend
const pool = require('./db')
const app = express()// express app instance

//var for port number
const PORT = process.env.PORT || 4000;

//middleware to serve static files
app.use(express.static(path.join(__dirname,'..','frontend')))

app.get('/api/db-test', async (req, res) => {
    try {
        const testresult = await pool.query(
            'SELECT current_database() AS database'
        );

        res.json({
            message: 'Database connection success!',
            database: testresult.rows[0].database
        });
    } catch (err) {
        console.error('Database error:', err.message);
        res.status(500).json({
            error: 'couldnt connect to db.'
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});