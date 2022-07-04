import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BotSchema = new Schema({
    botId: { type: String, required: false },
    userId: { type: String, required: false },
    botName: { type: String, required: false },
    botDescription: { type: String, required: false },
    nodes: { type: Array, required: false },
    edges: { type: Array, required: false },
    chats: { type: Array, required: false },
    createdAt: { type: Date, required: false, default: new Date() },
});

const Bots = mongoose.model("botsData", BotSchema);
export default Bots;
