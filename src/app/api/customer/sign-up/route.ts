import { createCustomer, getCustomerAccessToken } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    console.log("Sign-up attempt for:", input.email);
    
    const { customer, customerCreateErrors } = await createCustomer(input);
    
    if (customerCreateErrors && customerCreateErrors.length > 0) {
      console.log("Customer creation errors:", customerCreateErrors);
      return NextResponse.json(
        { errors: customerCreateErrors },
        { status: 400 },
      );
    }

    const { token } = await getCustomerAccessToken(input);
    
    if (!token) {
      return NextResponse.json(
        { errors: [{ code: "NO_TOKEN", field: [], message: "Failed to get access token after registration" }] },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token);

    return NextResponse.json({ ...customer, token });
  } catch (error: any) {
    console.error("Sign-up API error:", error);
    
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
