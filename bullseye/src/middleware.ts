import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./app/db/helpers/jwt";

export async function middleware(request: NextRequest) {
  try {
    let token = cookies().get("Authorization")?.value.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          error: "Authentication Failed",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = await readPayloadJose<{ id: string; username: string }>(
      token
    );
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-id-user", decoded.id);
    requestHeaders.set("x-username-user", decoded.username);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const config = {
  matcher: "/api/wishlists/:path*",
};
