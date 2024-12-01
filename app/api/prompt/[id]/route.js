import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

// GET Handler
export const GET = async (request, { params }) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response("Invalid ID format", { status: 400 });
        }

        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

// PATCH Handler
export const PATCH = async (request, { params }) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response("Invalid ID format", { status: 400 });
        }

        const { prompt, tag } = await request.json();

        if (!prompt || !tag) {
            return new Response("Invalid input data", { status: 400 });
        }

        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify({ message: "Successfully updated the prompt" }), { status: 200 });
    } catch (error) {
        console.error("PATCH Error:", error);
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

// DELETE Handler
export const DELETE = async (request, { params }) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response("Invalid ID format", { status: 400 });
        }

        await connectToDB();

        const result = await Prompt.findByIdAndDelete(params.id);

        if (!result) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};
