"use client";

import {
  Search,
  SlidersHorizontal,
  ListFilter,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";

type TaskHeaderProps = {
  onAddTask: () => void;

  search: string;
  onSearchChange: (value: string) => void;

  filter: string;
  onFilterChange: (value: string) => void;

  showAssignee: boolean;
  showDate: boolean;
  showTags: boolean;

  onToggleAssignee: () => void;
  onToggleDate: () => void;
  onToggleTags: () => void;
};

export default function TaskHeader({
  onAddTask,

  search,
  onSearchChange,

  filter,
  onFilterChange,

  showAssignee,
  showDate,
  showTags,

  onToggleAssignee,
  onToggleDate,
  onToggleTags,
}: TaskHeaderProps) {
  const [showSearch, setShowSearch] =
    useState(false);

  const [showFields, setShowFields] =
    useState(false);

  const [showFilter, setShowFilter] =
    useState(false);

  return (
    <header className="flex h-12 items-center justify-between border-b border-[#eeeeee] px-4">
      {/* Title / Search */}
      <div className="flex min-w-0 items-center gap-3">
        <h1 className="text-[13px] font-semibold text-[#222]">
          Tasks
        </h1>

        {showSearch && (
          <div className="flex h-7 items-center rounded-md border border-[#e5e5e5] bg-white px-2">
            <Search
              size={12}
              strokeWidth={1.8}
              className="mr-1.5 text-[#999]"
            />

            <input
              autoFocus
              value={search}
              onChange={(event) =>
                onSearchChange(
                  event.target.value
                )
              }
              placeholder="Search tasks..."
              className="w-[180px] bg-transparent text-[10px] text-[#333] outline-none placeholder:text-[#aaa]"
            />

            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                setShowSearch(false);
              }}
              className="ml-1 text-[#999] hover:text-[#333]"
              aria-label="Close search"
            >
              <X size={11} />
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        {!showSearch && (
          <button
            type="button"
            aria-label="Search tasks"
            onClick={() =>
              setShowSearch(true)
            }
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#555] hover:bg-[#f5f5f5]"
          >
            <Search
              size={14}
              strokeWidth={1.8}
            />
          </button>
        )}

        {/* Fields */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowFields(
                (value) => !value
              )
            }
            className="flex h-7 items-center gap-1.5 rounded-md border border-[#e5e5e5] bg-white px-2 text-[10px] font-medium text-[#333] hover:bg-[#f7f7f7]"
          >
            <SlidersHorizontal
              size={12}
              strokeWidth={1.8}
            />
            <span>Fields</span>
          </button>

          {showFields && (
            <div className="absolute right-0 top-9 z-50 w-[170px] rounded-lg border border-[#e5e5e5] bg-white p-2 shadow-lg">
              <div className="mb-2 px-1 text-[9px] font-semibold text-[#777]">
                SHOW FIELDS
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded px-2 py-1.5 hover:bg-[#f7f7f7]">
                <span className="text-[10px] text-[#333]">
                  Assignee
                </span>

                <input
                  type="checkbox"
                  checked={showAssignee}
                  onChange={
                    onToggleAssignee
                  }
                  className="h-3 w-3 accent-black"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded px-2 py-1.5 hover:bg-[#f7f7f7]">
                <span className="text-[10px] text-[#333]">
                  Due Date
                </span>

                <input
                  type="checkbox"
                  checked={showDate}
                  onChange={onToggleDate}
                  className="h-3 w-3 accent-black"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded px-2 py-1.5 hover:bg-[#f7f7f7]">
                <span className="text-[10px] text-[#333]">
                  Tags
                </span>

                <input
                  type="checkbox"
                  checked={showTags}
                  onChange={onToggleTags}
                  className="h-3 w-3 accent-black"
                />
              </label>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            aria-label="Filter tasks"
            onClick={() =>
              setShowFilter(
                (value) => !value
              )
            }
            className={`flex h-7 w-7 items-center justify-center rounded-md border text-[#444] hover:bg-[#f7f7f7] ${
              filter !== "ALL"
                ? "border-[#222] bg-[#f5f5f5]"
                : "border-[#e5e5e5] bg-white"
            }`}
          >
            <ListFilter
              size={12}
              strokeWidth={1.8}
            />
          </button>

          {showFilter && (
            <div className="absolute right-0 top-9 z-50 w-[150px] rounded-lg border border-[#e5e5e5] bg-white p-1.5 shadow-lg">
              <div className="mb-1 px-2 py-1 text-[9px] font-semibold text-[#777]">
                FILTER BY STATUS
              </div>

              {[
                ["ALL", "All"],
                ["TODO", "To Do"],
                ["DOING", "Doing"],
                ["COMPLETED", "Completed"],
                ["ON_HOLD", "On Hold"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onFilterChange(value);
                    setShowFilter(false);
                  }}
                  className={`flex w-full items-center rounded px-2 py-1.5 text-left text-[10px] ${
                    filter === value
                      ? "bg-[#f0f0f0] font-medium text-[#222]"
                      : "text-[#555] hover:bg-[#f7f7f7]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add Task */}
        <button
          type="button"
          onClick={onAddTask}
          className="flex h-7 items-center gap-1.5 rounded-md bg-[#202020] px-2.5 text-[10px] font-medium text-white transition hover:bg-[#333]"
        >
          <Plus
            size={12}
            strokeWidth={2}
          />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}