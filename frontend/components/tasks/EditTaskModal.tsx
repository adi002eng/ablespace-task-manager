"use client";

import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  updateTask,
  type Task,
  type TaskStatus,
} from "@/app/services/taskService";

type EditTaskModalProps = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditTaskModal({
  task,
  open,
  onClose,
  onUpdated,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<TaskStatus>("TODO");
  const [assignee, setAssignee] = useState("Admin");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setStatus(task.status);
      setAssignee(task.assignee ?? "Admin");
      setTag(task.tag ?? "");
    }
  }, [task]);

  if (!open || !task) {
    return null;
  }

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      await updateTask(task.id, {
        title,
        description,
        status,
        assignee,
        tag,
      });

      onClose();
      onUpdated();
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#eee] px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-[#222]">
              Edit Task
            </h2>

            <p className="mt-0.5 text-[10px] text-[#777]">
              Update task details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#777] hover:bg-[#f5f5f5]"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5"
        >
          <div>
            <label className="mb-1.5 block text-[10px] font-medium">
              Task title
            </label>

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="h-9 w-full rounded-md border border-[#ddd] px-3 text-[11px] outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={3}
              className="w-full resize-none rounded-md border border-[#ddd] px-3 py-2 text-[11px] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TaskStatus
                  )
                }
                className="h-9 w-full rounded-md border border-[#ddd] bg-white px-2 text-[10px]"
              >
                <option value="TODO">
                  To Do
                </option>

                <option value="DOING">
                  Doing
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="ON_HOLD">
                  On Hold
                </option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium">
                Assignee
              </label>

              <input
                value={assignee}
                onChange={(e) =>
                  setAssignee(e.target.value)
                }
                className="h-9 w-full rounded-md border border-[#ddd] px-3 text-[10px]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-medium">
              Tag
            </label>

            <input
              value={tag}
              onChange={(e) =>
                setTag(e.target.value)
              }
              placeholder="e.g. Development"
              className="h-9 w-full rounded-md border border-[#ddd] px-3 text-[10px]"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-[#eee] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-md border border-[#ddd] px-4 text-[10px]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-8 rounded-md bg-[#202020] px-4 text-[10px] text-white disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}