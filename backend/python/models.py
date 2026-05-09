from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship

class Workspace(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str = Field(index=True)
    repo_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    events: List["TimelineEvent"] = Relationship(back_populates="workspace")

class TimelineEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    workspace_id: str = Field(foreign_key="workspace.id")
    type: str  # decision, tool, operation, approval
    status: str  # success, running, waiting, failed
    title: str
    content: Optional[str] = None
    duration: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    workspace: Workspace = Relationship(back_populates="events")

class SandboxSession(SQLModel, table=True):
    id: str = Field(primary_key=True)
    workspace_id: str = Field(foreign_key="workspace.id")
    sandbox_name: str
    status: str
    preview_url: Optional[str] = None
    started_at: datetime = Field(default_factory=datetime.utcnow)
