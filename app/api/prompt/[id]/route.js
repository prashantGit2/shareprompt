import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

// GET (read)
export const GET = async (req, {params}) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findOne({
            _id: params.id,
        }).populate("creator");
        if (!prompt) {
            return new Response("Not found", {
                status: 404,
            });
        }
        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed", {
            status: 500,
        });
    }
}

// PATCH (update)
export const PATCH = async (req, {params}) => {
    const {prompt,tag} = await req.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id).populate("creator");
        if (!existingPrompt) {
            return new Response("Not found", {
                status: 404,
            });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
        });
    }
}


// DELETE (delete)
export const DELETE = async (req, {params}) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findByIdAndDelete(params.id);
        if (!prompt) {
            return new Response({error:"User not found with Id:" + params.id}, {
                status: 404,
            });
        }
        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(error, {
            status: 500,
        });
    }
}