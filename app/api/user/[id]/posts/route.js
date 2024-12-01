import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, context) => {
    try {
        const { params } = context;  // Access params from context
        const { id } = await params; // Await params before accessing `id`

        await connectToDB();

        const prompts = await Prompt.find({ creator: id }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return new Response("Failed to fetch prompts created by user", { status: 500 });
    }
}
