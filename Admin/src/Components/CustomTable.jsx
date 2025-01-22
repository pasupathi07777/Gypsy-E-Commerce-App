// import React from "react";

// const CustomTable = ({ data, columns, actions }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-left h-[50px]">
//             {columns.map((col, index) => (
//               <th key={index} className="px-4">
//                 {col.header}
//               </th>
//             ))}
//             {actions && <th className="px-4">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length + (actions ? 1 : 0)}
//                 className="text-center py-4 text-gray-500"
//               >
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             data.map((row) => (
//               <tr key={row._id} className="border-b h-[50px]">
//                 {columns.map((col, index) => (
//                   <td key={index} className="px-4">
//                     {col.render ? col.render(row) : row[col.field]}
//                   </td>
//                 ))}
//                 {actions && (
//                   <td className="px-4">
//                     <div className="flex space-x-4">{actions(row)}</div>
//                   </td>
//                 )}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomTable;





// import React from "react";
// import { Table, Pagination } from "rsuite"; // Import rsuite components

// const { Column, HeaderCell, Cell } = Table;

// const CustomTable = ({ data, columns, actions, limit, page, setPage, setLimit }) => {
//   // Handle pagination and limit changes
//   const handleChangeLimit = (dataKey) => {
//     setPage(1); // Reset to page 1 when limit changes
//     setLimit(dataKey); // Set the new limit
//   };


//   return (
//     <div>
//       <Table height={window.innerHeight} data={data}>
//         {columns.map((col, index) => (
//           <Column key={index} width={col.width || 200}>
//             <HeaderCell>{col.header}</HeaderCell>
//             <Cell>
//               {(row) => (col.render ? col.render(row) : row[col.field])}
//             </Cell>
//           </Column>
//         ))}

//         {actions && (
//           <Column width={150}>
//             <HeaderCell>Actions</HeaderCell>
//             <Cell>
//               {(row) => (
//                 <div className="flex space-x-4">
//                   {actions(row)} {/* Render actions (Edit/Delete) */}
//                 </div>
//               )}
//             </Cell>
//           </Column>
//         )}
//       </Table>

//       {/* Pagination */}
//       <div style={{ padding: 20 }}>
//         <Pagination
//           prev
//           next
//           first
//           last
//           ellipsis
//           boundaryLinks
//           maxButtons={5}
//           size="xs"
//           layout={["total", "-", "limit", "|", "pager", "skip"]}
//           total={data.length}
//           limitOptions={[10, 30, 50]} // Limit options
//           limit={limit}
//           activePage={page}
//           onChangePage={setPage} // Change page
//           onChangeLimit={handleChangeLimit} // Change limit
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomTable;
  

// import React from "react";

// const CustomTable = ({ data, columns, actions }) => {

  
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-left h-[50px]">
//             {columns.map((col, index) => (
//               <th key={index} className="px-4">
//                 {col.header}
//               </th>
//             ))}
//             {actions && <th className="px-4">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length + (actions ? 1 : 0)}
//                 className="text-center py-4 text-gray-500"
//               >
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             data.map((row) => (
//               <tr key={row._id} className="border-b h-[50px]">
//                 {columns.map((col, index) => (
//                   <td key={index} className="px-4 gap-2">
//                     {col.field === "photos" ? (
//                       <div
//                         className={`flex space-x-2  min-w-40 w-[${col.width}px`}
//                       >
//                         {row.photos.map((photo, idx) => (
//                           <img
//                             key={idx}
//                             src={photo}
//                             alt={`Product Image ${idx + 1}`}
//                             className="w-[30px] h-[30px] object-cover"
//                           />
//                         ))}
//                       </div>
//                     ) : col.render ? (
//                       col.render(row)
//                     ) : (
//                       row[col.field]
//                     )}
//                   </td>
//                 ))}
//                 {actions && (
//                   <td className="px-4">
//                     <div className="flex space-x-4">{actions(row)}</div>
//                   </td>
//                 )}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomTable;


// import React from "react";

// const CustomTable = ({ data, columns, actions, loading }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-left h-[50px]">
//             {columns.map((col, index) => (
//               <th key={index} className="px-4">
//                 {col.header}
//               </th>
//             ))}
//             {actions && <th className="px-4">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length + (actions ? 1 : 0)}
//                 className="text-center py-4 text-gray-500"
//               >
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             data.map((row, rowIndex) => (
//               <tr key={row._id} className="border-b h-[50px]">
//                 {columns.map((col, index) => (
//                   <td key={index} className="px-4 gap-2">
//                     {col.field === "index" ? (
//                       // Display the index (row number)
//                       <span>{rowIndex + 1}</span>
//                     ) : col.field === "photos" ? (
//                       <div className={`flex space-x-2 min-w-40`}>
//                         {row.photos.map((photo, idx) => (
//                           <img
//                             key={idx}
//                             src={photo}
//                             alt={`Product Image ${idx + 1}`}
//                             className="w-[30px] h-[30px] object-cover"
//                           />
//                         ))}
//                       </div>
//                     ) : col.render ? (
//                       col.render(row)
//                     ) : (
//                       row[col.field]
//                     )}
//                   </td>
//                 ))}
//                 {actions && (
//                   <td className="px-4">
//                     <div className="flex space-x-4">{actions(row)}</div>
//                   </td>
//                 )}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomTable;
import React from "react";

const CustomTable = ({ data, columns, actions, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left h-[50px]">
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
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row._id} className="border-b h-[50px]">
                {columns.map((col, index) => (
                  <td key={index} className="px-4 gap-2">
                    {col.field === "index" ? (
                      // Display the index (row number)
                      <span>{rowIndex + 1}</span>
                    ) : col.field === "photos" ? (
                      <div className="flex space-x-2 min-w-40">
                        {row.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`Product Image ${idx + 1}`}
                            className="w-[30px] h-[30px] object-cover"
                          />
                        ))}
                      </div>
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
  );
};

export default CustomTable;
