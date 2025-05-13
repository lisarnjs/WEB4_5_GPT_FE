import React from "react";

const SearchFilter = ({
  filters,
  filterConfigs,
  onFilterChange,
  onSearch,
  isLoading,
}) => (
  <form onSubmit={onSearch} className="mb-6 bg-white p-4 rounded-lg shadow">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {filterConfigs.map((config) =>
        config.type === "input" ? (
          <input
            key={config.name}
            type="text"
            name={config.name}
            value={filters[config.name]}
            onChange={onFilterChange}
            placeholder={config.placeholder}
            className="p-2 border rounded disabled:opacity-50"
            disabled={config.disabled || isLoading}
          />
        ) : (
          <select
            key={config.name}
            name={config.name}
            value={filters[config.name]}
            onChange={onFilterChange}
            className="p-2 border rounded disabled:opacity-50"
            disabled={config.disabled || isLoading}
          >
            <option value="">{config.placeholder}</option>
            {config.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      )}
    </div>
    <div className="mt-4 flex justify-end">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={isLoading}
      >
        조회
      </button>
    </div>
  </form>
);

export default SearchFilter;
