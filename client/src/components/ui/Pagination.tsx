import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface IPagination {
  page: number;
  setPage: React.Dispatch<number>;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination = (props: IPagination) => {
  return (
    <>
    {props.totalPages > 0 && <div className="flex items-center justify-between border-t border-gray-700  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
                      onClick={() => props.setPage(props.page - 1)}

             disabled={!props.hasPrevPage}
             className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
                         onClick={() => props.setPage(props.page + 1)}

             disabled={!props.hasNextPage}
             className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        {/* <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div> */}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={!props.hasPrevPage}
              onClick={() => props.setPage(props.page -1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FaArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {props.page}
            </a>

            <button
              disabled={!props.hasNextPage}
              onClick={() => props.setPage(props.page + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FaArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Pagination;
