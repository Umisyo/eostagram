import {prisma} from "~/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json({tags: tags})
  } catch (error) {
    return NextResponse.json({message: "Unable to retrieve tags"}, {status: 500})
  } finally {
    await prisma.$disconnect();
  }
}


