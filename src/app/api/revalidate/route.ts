import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get("tag");
    const secret = request.nextUrl.searchParams.get("secret");

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid Secret" }, { status: 401 });

    }
    if (!tag)
        return NextResponse.json({ message: "Not found tag" }, { status: 400 });

    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
}

