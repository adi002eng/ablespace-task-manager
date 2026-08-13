"use client";

import type { DragEvent } from "react";
import { MoreHorizontal } from "lucide-react";

import type { Task } from "@/app/services/taskService";

type TaskCardProps = {
  task: Task;

  onDelete: (id: string) => void;
  onEdit: (id: string) => void;

  showAssignee?: boolean;
  showDate?: boolean;
  showTags?: boolean;
};

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  showAssignee = true,
  showDate = true,
  showTags = true,
}: TaskCardProps) {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>
  ) => {
    // IMPORTANT:
    // Store the actual database task ID.
    event.dataTransfer.setData(
      "taskId",
      task.id
    );

    event.dataTransfer.effectAllowed = "move";

    console.log(
      "DRAG START:",
      task.id,
      task.title
    );
  };

  const handleDragEnd = () => {
    console.log(
      "DRAG END:",
      task.id
    );
  };

  const handleEdit = () => {
    onEdit(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="group cursor-grab rounded-md border border-[#e5e5e5] bg-white p-3 shadow-sm transition hover:border-[#d5d5d5] hover:shadow-md active:cursor-grabbing"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-[12px] font-medium leading-5 text-[#333]">
            {task.title || "Untitled task"}
          </h3>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Task options"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="flex h-6 w-6 items-center justify-center rounded-md text-[#999] opacity-0 transition hover:bg-[#f5f5f5] hover:text-[#555] group-hover:opacity-100"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-[#888]">
          {task.description}
        </p>
      )}

      {/* Assignee */}
      {showAssignee && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e8e8e8] text-[8px] font-medium text-[#666]">
            {task.assignee
              ? task.assignee
                  .charAt(0)
                  .toUpperCase()
              : "A"}
          </div>

          <span className="text-[9px] text-[#555]">
            {task.assignee ||
              "Unassigned"}
          </span>
        </div>
      )}

      {/* Metadata */}
      {(showDate || showTags) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {showDate &&
            task.dueDate && (
              <span className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[8px] text-[#777]">
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </span>
            )}

          {showTags && task.tag && (
            <span className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[8px] text-[#777]">
              {task.tag}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEdit();
          }}
          className="text-[9px] text-[#777] hover:text-[#222]"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete();
          }}
          className="text-[9px] text-[#999] hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}