import asyncio
import redis.asyncio as redis
from fastapi import WebSocket
from .config import settings

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}
        self.redis_client = redis.from_url(settings.REDIS_URL)

    async def connect(self, workspace_id: str, websocket: WebSocket):
        await websocket.accept()
        if workspace_id not in self.active_connections:
            self.active_connections[workspace_id] = []
            # Start Redis listener for this workspace if not already running
            asyncio.create_task(self.listen_to_redis(workspace_id))
        self.active_connections[workspace_id].append(websocket)

    def disconnect(self, workspace_id: str, websocket: WebSocket):
        if workspace_id in self.active_connections:
            self.active_connections[workspace_id].remove(websocket)

    async def broadcast(self, workspace_id: str, message: str):
        if workspace_id in self.active_connections:
            for connection in self.active_connections[workspace_id]:
                await connection.send_text(message)

    async def listen_to_redis(self, workspace_id: str):
        pubsub = self.redis_client.pubsub()
        await pubsub.subscribe(f"execution_events:{workspace_id}")

        async for message in pubsub.listen():
            if message["type"] == "message":
                await self.broadcast(workspace_id, message["data"].decode())

manager = ConnectionManager()
