export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { swarmOrchestrator } from "@/lib/erp/agents/swarm";

export async function GET() {
  return NextResponse.json({
    status: "ACTIVE",
    agents: swarmOrchestrator.getAgents(),
    modules: ["Finance", "HR", "Sales", "Marketing", "Supply Chain", "Projects", "Analytics"],
    intelligence: "OpenRouter + DeepSeek + Claude"
  });
}

export async function POST(request: Request) {
  try {
    const { task, module, data } = await request.json();
    if (!task) return NextResponse.json({ error: "Task required" }, { status: 400 });

    const result = await swarmOrchestrator.delegateTask(task, module);
    return NextResponse.json({
      result,
      agent: module || "auto-selected",
      timestamp: new Date().toISOString(),
      status: "completed"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
