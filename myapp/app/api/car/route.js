import db from "@/lib/db";
import Car from "@/models/Car";

export async function GET(req) {
    await db.connect()

    try {
        const cars = await Car.find({}).populate("creator")
        return new Response(JSON.stringify(cars), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await db.connect()


    try {
        const body = await req.json()
        const newCar = await Car.create(body)

        return new Response(JSON.stringify(newCar), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}