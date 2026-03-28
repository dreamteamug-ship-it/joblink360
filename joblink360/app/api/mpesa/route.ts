import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        console.log('[DARAJA-LOG]', JSON.stringify(data, null, 2));
        if (type === 'validation') {
            if (!data.BillRefNumber) return NextResponse.json({ ResultCode: 'C2B00011', ResultDesc: 'Rejected: Missing Ref' });
            return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
        }
        return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
    } catch (e) {
        return NextResponse.json({ ResultCode: '1', ResultDesc: 'Internal Server Error' }, { status: 500 });
    }
}
