from enum import Enum
from pydantic import BaseModel
from typing import List, Optional

class ToolType(str, Enum):
    FILE_WRITE = "file_write"
    TERMINAL_COMMAND = "terminal_command"
    GIT_OPERATION = "git_operation"
    SANDBOX_CREATE = "sandbox_create"

class ToolRequest(BaseModel):
    workspace_id: str
    type: ToolType
    title: str
    command: str
    args: Optional[List[str]] = None
    requires_approval: bool = False

class ToolResult(BaseModel):
    status: str
    output: str
    error: Optional[str] = None
