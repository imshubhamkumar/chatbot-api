import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const NodesSchema = new Schema({
    nodeId: { type: String, required: false },
    botId: { type: String, required: false },
    nodeType: { type: String, required: false },
    nodeUIType: { type: String, required: false },
    nodeLabel: { type: String, required: false },
    nodeData: { type: String, required: false },
    nodePosition: { type: Object, required: false },
    createdAt: { type: Date, required: false, default: new Date() },
});

const Nodes = mongoose.model("nodesData", NodesSchema);
export default Nodes;
