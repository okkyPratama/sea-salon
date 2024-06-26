
interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onViewDetail?: (item: T) => void;
}

const Table = <T extends object>({ columns, data, onViewDetail }: TableProps<T>) => {

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      {column.header}
                    </th>
                  ))}
                  {onViewDetail && <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.length == 0 ? (
                  <tr>
                         <td colSpan={columns.length + (onViewDetail ? 1 : 0)} className="px-6 py-8">
                      <div className="flex flex-col items-center justify-center">
                        <img src='/src/assets/no-data.png' alt="No Data" className="w-64 h-64 mb-4" />
                        <p className="text-gray-500 text-lg">No Data Available</p>
                      </div>
                    </td>
                  </tr>
                ): (
                  data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {String(item[column.accessor])}
                        </td>
                      ))}
                      {onViewDetail && (
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => onViewDetail(item)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            View Detail
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

