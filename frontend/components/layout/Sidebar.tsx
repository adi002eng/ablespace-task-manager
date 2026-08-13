"use client";

import {
  CheckSquare,
  FolderKanban,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [workspaceOpen, setWorkspaceOpen] = useState(true);

  return (
    <aside className="flex h-screen w-[190px] shrink-0 flex-col border-r border-[#e7e7e7] bg-white">
      {/* Profile */}
      <div className="flex h-[58px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9d9d9] text-[10px] font-semibold text-gray-700">
            D
          </div>

          <span className="text-[11px] font-medium text-[#202020]">
            Dexter
          </span>
        </div>

        <ChevronDown size={13} strokeWidth={1.8} />
      </div>

      {/* Workspace */}
      <div className="px-3">
        <button
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
          className="flex w-full items-center justify-between px-1 py-2 text-[10px] font-medium text-[#202020]"
        >
          <span>Workspace</span>

          {workspaceOpen ? (
            <ChevronUp size={12} strokeWidth={1.8} />
          ) : (
            <ChevronDown size={12} strokeWidth={1.8} />
          )}
        </button>

        {workspaceOpen && (
          <nav className="mt-1 space-y-1">
            {/* Tasks */}
            <button className="flex h-8 w-full items-center gap-2 rounded-md bg-[#f1f1f1] px-2 text-left text-[11px] font-medium text-[#222]">
              <CheckSquare size={14} strokeWidth={1.8} />
              <span>Tasks</span>
            </button>

            {/* Projects */}
            <button className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-[11px] text-[#555] hover:bg-[#f5f5f5]">
              <FolderKanban size={14} strokeWidth={1.8} />
              <span>Projects</span>
            </button>
          </nav>
        )}
      </div>
    </aside>
  );
}