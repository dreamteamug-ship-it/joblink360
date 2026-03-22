// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*')
            .eq('is_published', true)
            .order('featured', { ascending: false });

        if (error) throw error;

        return NextResponse.json({
            success: true,
            count: courses?.length || 0,
            courses: courses || []
        });
    } catch (error: any) {
        console.error("Courses API error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
