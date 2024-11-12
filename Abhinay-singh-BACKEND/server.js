
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173', 'https://abhinay-singh-ai-plagiarism-detector-client.vercel.app'];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));

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

