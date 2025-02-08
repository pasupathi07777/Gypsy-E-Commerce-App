import React, { useState } from "react";

const CustomTable = ({
  data,
  columns,
  actions,
  loading,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);



  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative flex flex-col h-[600px] border   ">
      <div className="overflow-x-auto overflow-y-auto flex-grow max-h-[600px] my-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 sticky top-0 ">
            <tr className="text-left h-[50px]">
              {columns.map((col, index) => (
                <th key={index} className="px-4">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-6 text-gray-500"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={row._id} className="border-b h-[50px]">
                  {columns.map((col, index) => (
                    <td key={index} className="px-4 gap-2">
                      {col.field === "index" ? (
                        <span>
                          {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                        </span>
                      ) : col.field === "photos" ? (
                        <div className="flex space-x-2 min-w-40">
                          {row.photos.map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Product ${idx + 1}`}
                              className="w-[30px] h-[30px] object-contain"
                            />
                          ))}
                        </div>
                      ) : col.field === "image" ? (
                        <img
                          src={row.image}
                          alt="Category"
                          className="w-[30px] h-[30px] object-cover"
                        />
                      ) : col.field === "description" ? (
                        row.description.length > 25 ? (
                          `${row.description.slice(0, 25)}...`
                        ) : (
                          row.description
                        )
                      ) : col.field === "name" ? (
                        row.name.length > 10 ? (
                          `${row.name.slice(0, 10)}...`
                        ) : (
                          row.name
                        )
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        row[col.field]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4">
                      <div className="flex space-x-4">{actions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 p-4 bg-white shadow-md border-t sticky bottom-0">
          <button
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
