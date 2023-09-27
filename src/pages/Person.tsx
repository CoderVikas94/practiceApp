import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Person = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstname", header: "First Name" },
      { accessorKey: "lastname", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "username", header: "User Name" },
      { accessorKey: "website", header: "website" },
      { accessorKey: "action", header: "Action" },
    ],
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: ["persons"],
    queryFn: async () => {
      return await axios
        .get("https://fakerapi.it/api/v1/users?_quantity=20&_gender=male")
        .then((res: any) => res?.data?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id: any) => {
      return id;
    },
    {
      onMutate: async (id) => {
        const previousData = queryClient.getQueryData(["persons"]);

        queryClient.setQueryData(["persons"], (oldData: any) => {
          return oldData.filter((person: any) => person.id !== id);
        });

        return { previousData };
      },
      onError: (_error, _variables, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(["persons"], context.previousData);
        }
      },
    }
  );

  const table: any = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full w-full mt-12">
      <div className="">
        <table className="w-full font-Poppins ">
          <thead className="bg-[#F2F2F2]">
            {table?.getHeaderGroups()?.map((headerGroup: any) => (
              <tr key={headerGroup.id} className="text-[14px] font-bold ">
                {headerGroup?.headers?.map((header: any, index: number) => {
                  if (index === 0) {
                    return (
                      <th
                        className="pl-14  text-start w-40 h-[46px]"
                        key={header.id}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  }
                  return (
                    <th className="text-start w-40  h-[46px]" key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <div className="absolute right-[50%] top-[50%]">Loading....</div>
            ) : table?.getRowModel()?.rows?.length > 0 ? (
              table?.getRowModel()?.rows?.map((row: any) => (
                <tr
                  key={row.id}
                  className=" w-full h-[46px] border border-b-[bg-[#F2F2F2] text-[13px] font-Poppins font-[600]"
                >
                  {row?.getVisibleCells()?.map((cell: any, index: number) => {
                    if (index === 0) {
                      return (
                        <td
                          className="overflow-hidden text-ellipsis pl-14 h-[46px] text-start"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    }
                    if (cell?.column?.id === "action") {
                      return (
                        <td
                          className=" overflow-hidden text-ellipsis h-[46px] text-start text-[#009AD4] underline"
                          key={cell.id}
                        >
                          <button
                            onClick={() =>
                              deleteMutation.mutateAsync(
                                cell?.row?.original?.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      );
                    }
                    return (
                      <td
                        className=" h-[46px] overflow-hidden text-ellipsis text-start max-h-[46px] min-h-[46px]"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <div className="absolute top-[50%] w-full  flex justify-center items-center">
                <h2>No data found</h2>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Person;
