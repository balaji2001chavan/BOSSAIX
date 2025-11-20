import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();

    // Load identity file
    const seedPath = path.join(process.cwd(), "brain/boss_identity.seed");
    const identity = fs.readFileSync(seedPath, "utf-8");

    // OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Request to model
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", name: "BossAix", content: identity },
        { role: "user", content: body.message },
      ],
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
