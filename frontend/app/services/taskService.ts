import api from "./api";

export type TaskStatus =
  | "TODO"
  | "DOING"
  | "COMPLETED"
  | "ON_HOLD";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  assignee?: string | null;
  dueDate?: string | null;
  tag?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTaskData = {
  title: string;
  description?: string;
  status?: TaskStatus;
  assignee?: string;
  dueDate?: string;
  tag?: string;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assignee?: string;
  dueDate?: string;
  tag?: string;
};

// GET /api/tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");

  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

// GET /api/tasks/:id
export const getTask = async (
  id: string
): Promise<Task> => {
  const response = await api.get(
    `/tasks/${id}`
  );

  return response.data?.data ?? response.data;
};

// POST /api/tasks
export const createTask = async (
  data: CreateTaskData
): Promise<Task> => {
  console.log("CREATE TASK:", data);

  const response = await api.post(
    "/tasks",
    data
  );

  console.log(
    "CREATE RESPONSE:",
    response.data
  );

  return (
    response.data?.data ??
    response.data
  );
};

// PATCH /api/tasks/:id
export const updateTask = async (
  id: string,
  data: UpdateTaskData
): Promise<Task> => {
  console.log(
    "PATCH TASK:",
    id,
    data
  );

  const response = await api.patch(
    `/tasks/${id}`,
    data
  );

  console.log(
    "PATCH RESPONSE:",
    response.data
  );

  return (
    response.data?.data ??
    response.data
  );
};

// DELETE /api/tasks/:id
export const deleteTask = async (
  id: string
): Promise<void> => {
  console.log(
    "DELETE TASK:",
    id
  );

  await api.delete(
    `/tasks/${id}`
  );
};