from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .database import init_db
from .ws_manager import manager
from .sandbox import sandbox_manager

app = FastAPI(title="GITCODE Backend")

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/health")
def health_check():
    return {"status": "operational", "system": "GITCODE OS"}

@app.post("/workspaces/{name}/initialize")
async def initialize_workspace(name: str):
    sandbox = await sandbox_manager.get_or_create_sandbox(name)
    return {"status": "initialized", "sandbox_name": sandbox.name}

@app.websocket("/ws/execution/{workspace_id}")
async def execution_websocket(websocket: WebSocket, workspace_id: str):
    await manager.connect(workspace_id, websocket)
    try:
        while True:
            # Wait for messages from frontend if needed
            data = await websocket.receive_text()
            # Push to Go bridge via Redis
            await manager.redis_client.publish(f"execution_requests:{workspace_id}", data)
    except WebSocketDisconnect:
        manager.disconnect(workspace_id, websocket)
    except Exception as e:
        print(f"WS Error: {e}")
        manager.disconnect(workspace_id, websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
