import express from "express";
import { register, login } from "../Controllers/auth.js";

const router = express.Router()

//Register a user
router.post('/register',register)

//Login a user
router.post('/login', login)

export default router