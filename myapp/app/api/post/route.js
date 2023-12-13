import db from "@/lib/db";
import Post from "@/models/Car";

export async function GET(req) {
    await db.connect()

    try {
        const posts = await Post.find({}).populate("creator")
        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await db.connect()


    try {
        const body = await req.json()
        const newPost = await Post.create(body)

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}