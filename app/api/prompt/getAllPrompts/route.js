import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const POST = async (req, res) => {
    const {limit} = await req.json();
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate("creator");
        if (limit) {
            return new Response(JSON.stringify(prompts.slice(0, limit)), {
                status: 200,
            });
        }
        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed", {
            status: 500,
        });
    }
}