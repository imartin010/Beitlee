import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/admin-auth";

/**
 * DELETE all page_visits and button_clicks. Admin only.
 */
export async function POST(request: NextRequest) {
  const session = await requireAdminSession(request);
  if (session instanceof NextResponse) return session;

  const supabase = createServerClient();

  const { error: visitsError } = await supabase
    .from("page_visits")
    .delete()
    .gte("visited_at", "1970-01-01T00:00:00.000Z");

  const { error: clicksError } = await supabase
    .from("button_clicks")
    .delete()
    .gte("clicked_at", "1970-01-01T00:00:00.000Z");

  if (visitsError) {
    console.error("Analytics reset page_visits error:", visitsError);
    return NextResponse.json(
      { message: "Error resetting page visits" },
      { status: 500 }
    );
  }
  if (clicksError) {
    console.error("Analytics reset button_clicks error:", clicksError);
    return NextResponse.json(
      { message: "Error resetting button clicks" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
