"use client";

import { useEffect, useState } from "react";

import TaskHeader from "../components/tasks/TaskHeader";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskModal from "../components/tasks/TaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";

import {
  getTasks,
  updateTask,
  deleteTask,
  type Task,
  type TaskStatus,
} from "./services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Status filter
  const [filter, setFilter] = useState("ALL");

  // Visible fields
  const [showAssignee, setShowAssignee] =
    useState(true);

  const [showDate, setShowDate] =
    useState(true);

  const [showTags, setShowTags] =
    useState(true);

  // Add Task modal
  const [addTaskOpen, setAddTaskOpen] =
    useState(false);

  // Edit Task modal
  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  // -----------------------------
  // Load Tasks
  // -----------------------------

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      console.log("TASKS:", data);

      setTasks(data);
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // -----------------------------
  // Add Task
  // -----------------------------

  const handleAddTask = () => {
    setAddTaskOpen(true);
  };

  const handleTaskCreated = async () => {
    await loadTasks();
  };

  // -----------------------------
  // Edit Task
  // -----------------------------

  const handleEdit = (id: string) => {
    console.log("EDIT TASK:", id);

    const task = tasks.find(
      (item) => item.id === id
    );

    if (!task) {
      console.error(
        "Task not found:",
        id
      );
      return;
    }

    setEditingTask(task);
    setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskUpdated = async () => {
    await loadTasks();
  };

  // -----------------------------
  // Delete Task
  // -----------------------------

  const handleDelete = async (
    id: string
  ) => {
    if (!id) {
      console.error(
        "Delete failed: task ID missing"
      );
      return;
    }

    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );

      alert(
        "Failed to delete task."
      );
    }
  };

  // -----------------------------
  // Drag & Drop
  // -----------------------------

  const handleStatusChange = async (
    id: string,
    status: TaskStatus
  ) => {
    console.log(
      "STATUS CHANGE:",
      id,
      status
    );

    if (!id) {
      console.error(
        "Cannot update task: ID is undefined"
      );
      return;
    }

    const previousTasks = [...tasks];

    // Update UI immediately
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      )
    );

    try {
      const updatedTask =
        await updateTask(id, {
          status,
        });

      console.log(
        "STATUS UPDATED:",
        updatedTask
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updatedTask,
              }
            : task
        )
      );
    } catch (error) {
      console.error(
        "Failed to save task status:",
        error
      );

      // Restore previous UI
      setTasks(previousTasks);

      alert(
        "Failed to save task status."
      );
    }
  };

  // -----------------------------
  // Search + Filter
  // -----------------------------

  const filteredTasks = tasks.filter(
    (task) => {
      const query = search
        .trim()
        .toLowerCase();

      const title =
        task.title?.toLowerCase() || "";

      const description =
        task.description?.toLowerCase() ||
        "";

      const assignee =
        task.assignee?.toLowerCase() ||
        "";

      const tag =
        task.tag?.toLowerCase() || "";

      const matchesSearch =
        query === "" ||
        title.includes(query) ||
        description.includes(query) ||
        assignee.includes(query) ||
        tag.includes(query);

      const matchesFilter =
        filter === "ALL" ||
        task.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <main className="min-h-screen bg-white">
      <TaskHeader
        onAddTask={handleAddTask}
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        showAssignee={showAssignee}
        showDate={showDate}
        showTags={showTags}
        onToggleAssignee={() =>
          setShowAssignee(
            (value) => !value
          )
        }
        onToggleDate={() =>
          setShowDate(
            (value) => !value
          )
        }
        onToggleTags={() =>
          setShowTags(
            (value) => !value
          )
        }
      />

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-[11px] text-[#888]">
            Loading tasks...
          </p>
        </div>
      ) : (
        <TaskBoard
          tasks={filteredTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onStatusChange={
            handleStatusChange
          }
          showAssignee={showAssignee}
          showDate={showDate}
          showTags={showTags}
        />
      )}

      {/* Add Task Modal */}
      <TaskModal
        open={addTaskOpen}
        onClose={() =>
          setAddTaskOpen(false)
        }
        onTaskCreated={
          handleTaskCreated
        }
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        open={editModalOpen}
        onClose={handleCloseEdit}
        onUpdated={handleTaskUpdated}
      />
    </main>
  );
}