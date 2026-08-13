"use client";

import type { DragEvent } from "react";

import TaskCard from "./TaskCard";
import type {
  Task,
  TaskStatus,
} from "@/app/services/taskService";

type TaskBoardProps = {
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

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  {
    status: "TODO",
    title: "To Do",
  },
  {
    status: "DOING",
    title: "Doing",
  },
  {
    status: "COMPLETED",
    title: "Completed",
  },
  {
    status: "ON_HOLD",
    title: "On Hold",
  },
];

export default function TaskBoard({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
  showAssignee = true,
  showDate = true,
  showTags = true,
}: TaskBoardProps) {
  const handleDragOver = (
    event: DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    status: TaskStatus
  ) => {
    event.preventDefault();

    const taskId =
      event.dataTransfer.getData(
        "taskId"
      );

    if (!taskId) {
      return;
    }

    console.log(
      "DROP:",
      taskId,
      "→",
      status
    );

    onStatusChange(
      taskId,
      status
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-48px)] grid-cols-4 gap-3 bg-[#fafafa] p-4">
      {columns.map((column) => {
        const columnTasks =
          tasks.filter(
            (task) =>
              task.status ===
              column.status
          );

        return (
          <div
            key={column.status}
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(
                event,
                column.status
              )
            }
            className="flex min-h-[500px] flex-col rounded-lg border border-[#e8e8e8] bg-[#f7f7f7]"
          >
            {/* Column header */}
            <div className="flex items-center justify-between border-b border-[#e8e8e8] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-semibold text-[#333]">
                  {column.title}
                </h2>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e9e9e9] px-1.5 text-[9px] font-medium text-[#666]">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="flex flex-1 flex-col gap-2 p-2">
              {columnTasks.length ===
              0 ? (
                <div className="flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#ddd] text-[10px] text-[#aaa]">
                  Drop task here
                </div>
              ) : (
                columnTasks.map(
                  (task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={
                        onDelete
                      }
                      onEdit={onEdit}
                      showAssignee={
                        showAssignee
                      }
                      showDate={
                        showDate
                      }
                      showTags={
                        showTags
                      }
                    />
                  )
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}