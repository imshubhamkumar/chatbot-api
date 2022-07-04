import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
import Bots from "../model/bots";

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "this is the bots route" });
});

router.post("/createBot", async (req: Request, res: Response) => {
        const newBot = new Bots({
            botId: uuidv4(),
            userId: req.body.userId,
            botName: req.body.botName,
            botDescription: req.body.botDescription,
            nodes: req.body.nodes,
            edges: req.body.edges,
            chats: req.body.chats
        })
        await newBot.save();
    return res.status(200).json({ message: "this is the bots route" });
});

router.post("/addNodes", (req: Request, res: Response) => {

    return res.status(200).json({ message: "this is the bots route" });
});
router.post("/addEdges", (req: Request, res: Response) => {
    return res.status(200).json({ message: "this is the bots route" });
});
router.post("/addChats", (req: Request, res: Response) => {
    return res.status(200).json({ message: "this is the bots route" });
});

export = router;