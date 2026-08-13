"use client";

import {
  X,
  CalendarDays,
  User,
  Tag,
} from "lucide-react";
import { FormEvent, useState } from "react";
import {
  createTask,
  type TaskStatus,
} from "@/app/services/taskService";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
};

export default function TaskModal({
  open,
  onClose,
  onTaskCreated,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState<TaskStatus>("TODO");
  const [assignee, setAssignee] =
    useState("Admin");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  if (!open) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("TODO");
    setAssignee("Admin");
    setDate("");
    setTag("");
    setError("");
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createTask({
        title: title.trim(),
        description:
          description.trim() || undefined,
        status,
        assignee,
        dueDate: date || undefined,
        tag: tag.trim() || undefined,
      });

      resetForm();
      onClose();

      onTaskCreated?.();
    } catch (error) {
      console.error(
        "Failed to create task:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-[#222]">
              Add Task
            </h2>

            <p className="mt-0.5 text-[10px] text-[#777]">
              Create a new task for your workspace
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#777] hover:bg-[#f5f5f5]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5"
        >
          {/* Error */}
          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-[10px] text-red-600">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
              Task title
            </label>

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
              className="h-9 w-full rounded-md border border-[#dedede] px-3 text-[11px] outline-none placeholder:text-[#aaa] focus:border-[#999]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Add a description..."
              rows={3}
              className="w-full resize-none rounded-md border border-[#dedede] px-3 py-2 text-[11px] outline-none placeholder:text-[#aaa] focus:border-[#999]"
            />
          </div>

          {/* Status + Assignee */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as TaskStatus
                  )
                }
                className="h-9 w-full rounded-md border border-[#dedede] bg-white px-2 text-[10px] outline-none"
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
              <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
                Assignee
              </label>

              <div className="relative">
                <User
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#888]"
                />

                <select
                  value={assignee}
                  onChange={(e) =>
                    setAssignee(e.target.value)
                  }
                  className="h-9 w-full rounded-md border border-[#dedede] bg-white pl-7 pr-2 text-[10px] outline-none"
                >
                  <option>Admin</option>
                  <option>Designer</option>
                  <option>Developer</option>
                  <option>QA Team</option>
                  <option>Product</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date + Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
                Due date
              </label>

              <div className="relative">
                <CalendarDays
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#888]"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="h-9 w-full rounded-md border border-[#dedede] bg-white pl-7 pr-2 text-[10px] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-medium text-[#333]">
                Tag
              </label>

              <div className="relative">
                <Tag
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#888]"
                />

                <input
                  value={tag}
                  onChange={(e) =>
                    setTag(e.target.value)
                  }
                  placeholder="e.g. Development"
                  className="h-9 w-full rounded-md border border-[#dedede] pl-7 pr-2 text-[10px] outline-none placeholder:text-[#aaa]"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 border-t border-[#eeeeee] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-8 rounded-md border border-[#dedede] px-4 text-[10px] font-medium text-[#555] hover:bg-[#f7f7f7] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-8 rounded-md bg-[#202020] px-4 text-[10px] font-medium text-white hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}