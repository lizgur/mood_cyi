import { getCustomerAccessToken, getUserDetails } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    console.log("Login attempt for:", input.email);
    
    const { token, customerLoginErrors } = await getCustomerAccessToken(input);
    console.log("Token result:", { hasToken: !!token, errors: customerLoginErrors });
    
    if (customerLoginErrors && customerLoginErrors.length > 0) {
      return NextResponse.json(
        { errors: customerLoginErrors },
        { status: 400 },
      );
    }

    if (!token) {
      return NextResponse.json(
        { errors: [{ code: "NO_TOKEN", field: [], message: "Failed to get access token" }] },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token);

    const { customer } = await getUserDetails(token);
    console.log("User details:", customer);

    return NextResponse.json({ ...customer, token });
  } catch (error: any) {
    console.error("Login API error:", error);
    
    // Better error handling
    let message = "Internal server error";
    let status = 500;
    
    if (error?.error?.message) {
      message = error.error.message;
      status = error.error.status || 500;
    } else if (error?.message) {
      message = error.message;
    }
    
    return NextResponse.json(
      { errors: [{ code: "INTERNAL_ERROR", field: [], message }] },
      { status },
    );
  }
}
