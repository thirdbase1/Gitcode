from vercel_sandbox import Sandbox
from .config import settings
import asyncio

class SandboxManager:
    def __init__(self):
        self.active_sandboxes = {}

    async def get_or_create_sandbox(self, workspace_name: str):
        if workspace_name in self.active_sandboxes:
            return self.active_sandboxes[workspace_name]

        try:
            # Try to get existing persistent sandbox
            sandbox = await Sandbox.get(name=workspace_name)
            print(f"Resumed existing sandbox: {workspace_name}")
        except Exception:
            # Create new persistent sandbox
            sandbox = await Sandbox.create(
                name=workspace_name,
                persistent=True,
                snapshot_expiration=settings.DEFAULT_EXPIRATION_MS,
                timeout=settings.DEFAULT_TIMEOUT_MS,
            )
            print(f"Created new sandbox: {workspace_name}")

        self.active_sandboxes[workspace_name] = sandbox
        return sandbox

    async def run_command(self, workspace_name: str, cmd: str, args: list = None):
        sandbox = await self.get_or_create_sandbox(workspace_name)
        result = await sandbox.run_command(cmd, args or [])
        return result

    async def stop_sandbox(self, workspace_name: str):
        if workspace_name in self.active_sandboxes:
            sandbox = self.active_sandboxes.pop(workspace_name)
            await sandbox.stop()
            print(f"Stopped sandbox: {workspace_name}")

sandbox_manager = SandboxManager()
