import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '~/lib/prisma';

interface UserObject {
  id: string;
  username: string;
}

async function userExists(id: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return !!user;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const requestReader = req.body?.getReader();
    const userObject: UserObject = await requestReader?.read().then(({ done, value }) => {
      const decoder = new TextDecoder();
      const decodedValue = decoder.decode(value);
      return JSON.parse(decodedValue).data;
    });

    if (await userExists(userObject.id)) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        id: userObject.id,
        name: userObject.username,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
