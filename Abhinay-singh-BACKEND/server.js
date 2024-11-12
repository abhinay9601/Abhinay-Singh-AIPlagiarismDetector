
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: ['https://abhinay-singh-ai-plagiarism-detector-client.vercel.app', 'http://localhost:5173'], // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
app.use(cors(corsOptions));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const plagiarismRoutes = require("./src/routes/plagiarismRoutes");
app.use("/api", plagiarismRoutes);


app.use("/", (req, res) => {
    res.send("Server is Running")
})
// Local server setup
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

