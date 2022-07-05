import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EdgeSchema = new Schema({
    edgeId: { type: String, required: false },
    botId: { type: String, required: false },
    sourceId: { type: String, required: false },
    targetId: { type: String, required: false },
    createdAt: { type: Date, required: false, default: new Date() },
});

const Edges = mongoose.model("edgesData", EdgeSchema);
export default Edges;
