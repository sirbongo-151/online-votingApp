import express from "express";
import { addVoteCandidate, createCandidate, deleteCandidate, getCandidates, updateCandidate } from "../controllers/CandidateController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"),createCandidate);
router.get("/", getCandidates);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

router.put("/vote/:id", addVoteCandidate);

export default router;