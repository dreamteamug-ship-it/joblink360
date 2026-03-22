// app/api/funding/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
    try {
        const { data: opportunities, error } = await supabase
            .from('funding_opportunities')
            .select('*')
            .eq('is_active', true)
            .order('deadline', { ascending: true });

        if (error) throw error;

        return NextResponse.json({
            success: true,
            count: opportunities?.length || 0,
            opportunities: opportunities || []
        });
    } catch (error: any) {
        console.error("Funding API error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
