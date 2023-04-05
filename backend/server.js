const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();
const mongoStore = new MongoStore({
	mongoUrl: process.env.MONGODB_URI,
	collectionName: "sessions"
});
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(
	session({
		// Unfortunately, session secret has to be static for persistent memory.
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: mongoStore
	})
);

app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((err) => {
		console.error("MongoDB connection error", err);
	});

const buildPath = path.join(__dirname, "/../frontend/build/");
app.use(express.static(buildPath));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/todos", require("./routes/todoList"));

app.get("/*", function (req, res) {
	res.sendFile(buildPath + "index.html");
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(3000, () => {
	console.log(`Server running on port ${port}`);
});
