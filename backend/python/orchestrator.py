from .tools import ToolRequest, ToolType, ToolResult
from .sandbox import sandbox_manager
from .ws_manager import manager
import json

class AIOrchestrator:
    async def execute_tool(self, request: ToolRequest):
        # 1. Log event to timeline (backend-generated)
        event = {
            "type": request.type,
            "status": "running",
            "title": request.title,
            "workspace_id": request.workspace_id
        }
        await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))

        # 2. Check for approval
        if request.requires_approval:
            await manager.broadcast(request.workspace_id, json.dumps({
                "event": "approval.required",
                "data": {
                    "operation": request.title,
                    "risk": "medium"
                }
            }))
            # In a real scenario, we'd wait for a websocket signal here
            return ToolResult(status="blocked", output="Waiting for approval")

        # 3. Execute
        try:
            if request.type == ToolType.TERMINAL_COMMAND:
                result = await sandbox_manager.run_command(request.workspace_id, request.command, request.args)
                output = await result.stdout()

                # Stream preview URL if detected
                if "http://localhost:" in output or "https://" in output:
                    # In a real Sandbox SDK call, we'd get sandbox.domain(port)
                    preview_url = f"https://sandbox-{request.workspace_id}.vercel.app"
                    await manager.broadcast(request.workspace_id, json.dumps({
                        "event": "preview.available",
                        "data": {"url": preview_url}
                    }))

                event["status"] = "success"
                await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))
                return ToolResult(status="success", output=output)

            # Other tool types...
            return ToolResult(status="success", output="Operation completed")
        except Exception as e:
            event["status"] = "failed"
            await manager.broadcast(request.workspace_id, json.dumps({"event": "timeline.update", "data": event}))
            return ToolResult(status="failed", output="", error=str(e))

orchestrator = AIOrchestrator()
