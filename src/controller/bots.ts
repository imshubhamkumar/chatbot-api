import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
import Bots from "../model/bots";
import Nodes from "../model/nodes";
import Edges from "../model/edges";

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "this is the bots route" });
});

router.post("/createBot", async (req: Request, res: Response) => {
    const botId = uuidv4();
    const parentNodeId = uuidv4()
    const firstResponseId = uuidv4()
    const fallbackId = uuidv4()
        const newBot = new Bots({
            botId,
            userId: req.body.userId,
            botName: req.body.botName,
            botDescription: req.body.botDescription
        })
        await newBot.save();
        Nodes.insertMany([
            {
                nodeId: parentNodeId,
                botId,
                nodeType: 'home',
                nodeUIType: 'custom',
                nodeLabel: 'Start point',
                nodeData: 'home_response',
                nodePosition: { x: 630, y: 40 }
            },
            {
                nodeId: firstResponseId,
                botId,
                nodeType: 'bot',
                nodeUIType: 'custom',
                nodeLabel: 'Bot response',
                nodeData: 'bot_response',
                nodePosition: { x: 730, y: 150 }
            },
            {
                nodeId: fallbackId,
                botId,
                nodeType: 'fallback',
                nodeUIType: 'custom',
                nodeLabel: 'Default fallback',
                nodeData: 'default_fall',
                nodePosition: { x: 530, y: 150 }
            }
        ])
        Edges.insertMany([
            {
                edgeId: uuidv4(),
                botId,
                sourceId: parentNodeId,
                targetId: firstResponseId
            },
            {
                edgeId: uuidv4(),
                botId,
                sourceId: parentNodeId,
                targetId: fallbackId
            }
        ])
    return res.status(200).json({ message: "Bot created successfuly" });
});

router.post("/createNodes", async (req: Request, res: Response) => {
    const nodeId = uuidv4()
    const newNode = new Nodes({
        nodeId: nodeId,
        botId: req.body.newNode.botId,
        nodeType: req.body.newNode.nodeType,
        nodeUIType: req.body.newNode.nodeUIType,
        nodeLabel: req.body.newNode.nodeLabel,
        nodeData: req.body.newNode.nodeData,
        nodePosition: req.body.newNode.nodePosition
    })
    await newNode.save();
    const newEdge = new Edges({
        edgeId: uuidv4(),
        botId: req.body.newEdge.botId,
        sourceId: req.body.newEdge.source,
        targetId: nodeId
    })
    await newEdge.save();
    return res.status(200).json({ message: "New node created" });
});
router.post("/createEdges", async (req: Request, res: Response) => {
    const newEdge = new Edges({
        edgeId: req.body.edgeId,
        botId: req.body.botId,
        sourceId: req.body.sourceId,
        targetId: req.body.targetId
    })
    await newEdge.save();
    return res.status(200).json({ message: "this is the bots route" });
});
router.post("/addChats", (req: Request, res: Response) => {
    return res.status(200).json({ message: "this is the bots route" });
});

router.get("/getBotList/:userId", async (req: Request, res: Response) => {
    try {
        const getBotList = await Bots.find({ userId: req.params.userId })
        return res.status(200).json({ errors: false, data: getBotList });
    } catch (err) {
        return res.status(200).json({ errors: true, message: err });
    }
});

router.get("/getNodes/:botId", async (req: Request, res: Response) => {
    try {
        const getNodes = await Nodes.find({ userId: req.params.botId })
        return res.status(200).json({ errors: false, data: getNodes });
    } catch (err) {
        return res.status(200).json({ errors: true, message: err });
    }
});

router.get("/getEdges/:botId", async (req: Request, res: Response) => {
    try {
        const getEdges = await Edges.find({ userId: req.params.botId })
        return res.status(200).json({ errors: false, data: getEdges });
    } catch (err) {
        return res.status(200).json({ errors: true, message: err });
    }
});

export = router;