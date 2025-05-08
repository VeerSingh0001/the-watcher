import { useState } from "react";

export default function LogFilters() {
  const categories = ["all", "alerts", "flows", "stats"];
  const [isHide, setIsHide] = useState(true);
  const [category, setCategory] = useState("all");
  return (
    <div className="w-50">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="capitalize text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsHide(!isHide)}
      >
        {category}

        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {!isHide && (
        <div id="dropdown" className="absolute bg-gray-800 z-100 w-2xs border">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {categories.map((category) => (
              <li
                onClick={() => {
                  setCategory(category);
                  setIsHide(true);
                }}
                key={category}
              >
                <a
                  href="#"
                  className=" capitalize block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
