// app/api/funding/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const grants = [
        { 
            id: 1, 
            title: "Digital Economy for Africa", 
            donor: "World Bank", 
            amount: "$50 Million", 
            deadline: "2025-06-30",
            category: "Technology",
            description: "Funding for digital infrastructure and skills development",
            url: "https://www.worldbank.org"
        },
        { 
            id: 2, 
            title: "Youth Entrepreneurship Program", 
            donor: "African Development Bank", 
            amount: "$15 Million", 
            deadline: "2025-07-30",
            category: "Entrepreneurship",
            description: "Supporting young entrepreneurs across Africa",
            url: "https://www.afdb.org"
        },
        { 
            id: 3, 
            title: "EU-Africa Digital Bridge", 
            donor: "European Union", 
            amount: "€40 Million", 
            deadline: "2025-09-15",
            category: "Technology",
            description: "Digital transformation projects",
            url: "https://ec.europa.eu"
        }
    ];
    return NextResponse.json({ success: true, opportunities: grants });
}
