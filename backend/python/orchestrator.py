from openai import OpenAI
from .tools import ToolRequest, ToolType, ToolResult
from .sandbox import sandbox_manager
from .ws_manager import manager
from .config import settings
import json

client = OpenAI(
    base_url=settings.OPENROUTER_BASE_URL,
    api_key=settings.OPENROUTER_API_KEY,
)

class AIOrchestrator:
    async def chat_and_execute(self, workspace_id: str, prompt: str, model: str):
        # Implementation for OpenRouter chat and tool orchestration
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        # Process response and execute tools...
        return response.choices[0].message.content

    async def execute_tool(self, request: ToolRequest):
        event = {
            "type": request.type,
            "status": "running",
            "title": request.title,
            "workspace_id": request.workspace_id
        }
        await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))

        if request.requires_approval:
            await manager.broadcast(request.workspace_id, json.dumps({
                "event": "approval.required",
                "data": {
                    "operation": request.title,
                    "risk": "medium"
                }
            }))
            return ToolResult(status="blocked", output="Waiting for approval")

        try:
            if request.type == ToolType.TERMINAL_COMMAND:
                result = await sandbox_manager.run_command(request.workspace_id, request.command, request.args)
                output = await result.stdout()

                if "http://localhost:" in output or "https://" in output:
                    preview_url = f"https://sandbox-{request.workspace_id}.vercel.app"
                    await manager.broadcast(request.workspace_id, json.dumps({
                        "event": "preview.available",
                        "data": {"url": preview_url}
                    }))

                event["status"] = "success"
                await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))
                return ToolResult(status="success", output=output)

            return ToolResult(status="success", output="Operation completed")
        except Exception as e:
            event["status"] = "failed"
            await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))
            return ToolResult(status="failed", output="", error=str(e))

orchestrator = AIOrchestrator()
