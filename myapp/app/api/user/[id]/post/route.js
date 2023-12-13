import Post from "@/models/Car";
import db from "@/lib/db";

export const GET = async (request, { params }) => {
    db.connect()
    try {
        const posts = await Post.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 