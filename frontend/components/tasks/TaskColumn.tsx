"use client";

import { useState } from "react";

import TaskCard from "./TaskCard";

import type {
  Task,
  TaskStatus,
} from "@/app/services/taskService";

type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];

  onDelete: (id: string) => void;
  onEdit: (id: string) => void;

  onStatusChange: (
    id: string,
    status: TaskStatus
  ) => void;

  showAssignee?: boolean;
  showDate?: boolean;
  showTags?: boolean;
};

export default function TaskColumn({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
  showAssignee = true,
  showDate = true,
  showTags = true,
}: TaskColumnProps) {
  const [isDragOver, setIsDragOver] =
    useState(false);

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setIsDragOver(false);

    const taskId =
      event.dataTransfer.getData(
        "taskId"
      );

    if (!taskId) {
      console.error(
        "No task ID found during drop"
      );
      return;
    }

    console.log(
      "DROP TASK:",
      taskId,
      "NEW STATUS:",
      status
    );

    onStatusChange(taskId, status);
  };

  return (
    <div
      className={`flex min-h-[500px] flex-1 flex-col rounded-lg border transition ${
        isDragOver
          ? "border-[#999] bg-[#fafafa]"
          : "border-[#eeeeee] bg-[#fafafa]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between border-b border-[#eeeeee] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-[#333]">
            {title}
          </span>

          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#eeeeee] px-1.5 text-[8px] font-medium text-[#777]">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-1 flex-col gap-2 p-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            showAssignee={showAssignee}
            showDate={showDate}
            showTags={showTags}
          />
        ))}

        {/* Empty Drop Area */}
        {tasks.length === 0 && (
          <div
            className={`flex min-h-[100px] flex-1 items-center justify-center rounded-md border border-dashed ${
              isDragOver
                ? "border-[#999] bg-white"
                : "border-[#e5e5e5]"
            }`}
          >
            <span className="text-[9px] text-[#aaa]">
              Drop tasks here
            </span>
          </div>
        )}
      </div>
    </div>
  );
}