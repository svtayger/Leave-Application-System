const express = require('express')
const sql = require('mssql')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

// Test DB Connection
sql.connect(config)
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.error('DB Connection Failed:', err))

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password) // Note: hash passwords in real apps!
      .query(`SELECT id, name, role FROM Employees WHERE email = @email AND password = @password`);

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.recordset[0];
    res.json(user); // send back user info
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST Leave Request
app.post('/api/leave', async (req, res) => {
  const { employeeId, leaveType, reason, startDate, endDate } = req.body
  try {
    const pool = await sql.connect(config)
    const result = await pool.request()
      .input('employeeId', sql.Int, employeeId)
      .input('leaveType', sql.VarChar, leaveType)
      .input('reason', sql.Text, reason)
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .query(`
        INSERT INTO LeaveRequests (employeeId, leaveType, reason, startDate, endDate, status)
        VALUES (@employeeId, @leaveType, @reason, @startDate, @endDate, 'pending')
      `)
    res.status(201).send({ message: 'Leave request submitted' })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// GET All Pending Requests
app.get('/api/leave/pending', async (req, res) => {
  try {
    const pool = await sql.connect(config)
    const result = await pool.request().query(`
      SELECT L.id, E.name, L.leaveType, L.reason, L.startDate, L.endDate
      FROM LeaveRequests L
      JOIN Employees E ON L.employeeId = E.id
      WHERE L.status = 'pending'
    `)
    res.json(result.recordset)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Approve or Reject Leave
app.post('/api/leave/:id/:action', async (req, res) => {
  const { id, action } = req.params
  const { comment } = req.body
  const status = action === 'approve' ? 'approved' : 'rejected'
  try {
    const pool = await sql.connect(config)
    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.VarChar, status)
      .input('comment', sql.Text, comment)
      .query(`
        UPDATE LeaveRequests SET status = @status, reviewerComment = @comment
        WHERE id = @id
      `)
    res.send({ message: `Leave request ${status}` })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// GET Leave Requests by User ID
app.get('/api/leave/user/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('employeeId', sql.Int, employeeId)
      .query(`
        SELECT id, leaveType, reason, startDate, endDate, status 
        FROM LeaveRequests 
        WHERE employeeId = @employeeId
        ORDER BY startDate DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/leave/pending", async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT L.id, L.employeeId, L.leaveType, L.reason, L.startDate, L.endDate, L.status, E.name
      FROM LeaveRequests L
      JOIN Employees E ON L.employeeId = E.id
      WHERE L.status = 'pending'
    `)
    res.json(result.recordset)
  } catch (err) {
    console.error("Error fetching pending leave requests:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

// GET /api/profile/:id
app.get('/api/profile/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT name, email, phone FROM Employees WHERE id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users - Create new user
app.post('/api/users', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password) // In production, hash this
      .input('role', sql.VarChar, role)
      .query(`
        INSERT INTO Employees (name, email, password, role)
        VALUES (@name, @email, @password, @role)
      `);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const pool = await sql.connect(config)
    const result = await pool.request().query("SELECT id, name, email, role FROM Employees")
    res.json(result.recordset)
  } catch (err) {
    console.error("Error fetching users:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})




