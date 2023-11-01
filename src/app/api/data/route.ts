import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        message: "Hi, I'm Deepfocused",
    };
    return NextResponse.json(data);
}
