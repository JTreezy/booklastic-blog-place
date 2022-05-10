const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users",userRoutes);

const bookRoutes = require("./bookRoutes");
router.use("/books",bookRoutes);

const genreRoutes = require("./genreRoutes");
router.use("/genres",genreRoutes);

const blogRoutes = require("./blogRoutes");
router.use("/blogs",blogRoutes);

const commentRoutes = require("./commentRoutes");
router.use("/comments",commentRoutes);

module.exports = router;