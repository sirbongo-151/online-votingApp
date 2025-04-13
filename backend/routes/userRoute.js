import express from "express";
import { createUser, deleteUser,  getUser, login, logout, updateUser, userRole,  } from "../controllers/userController.js";

// import { authenticate, authorizedAdmin } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", createUser)
router.get("/", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

// auth
router.put("/:id/role", userRole)
router.post("/auth", login)
router.post("/logout", logout)


export default router