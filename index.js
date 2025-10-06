require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoutes = require('./routes/productRoutes')

// middleware to parse JSON request body and form data (application/x-www-form-urlencoded)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send("Hello from Express + Mongo API")
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!")
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })
    })
    .catch((err) => console.log("MongoDB connection error:", err.message))

/*
async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://aryanpatel1918:gPROe8dKOw3bgPc6@cluster0.rvpug2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected successfully!")
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })
    } catch (err) {
        console.log("MongoDB connection error:", err)
    }
}
connectDB()
*/

