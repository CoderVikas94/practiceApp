import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import comapnyImage from "../assets/company.jpg";
import CompanyDetails from "../components/CompanyDetails";
import { useDisclosure } from "@nextui-org/react";

const Company = () => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: companyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      return await axios
        .get("https://fakerapi.it/api/v1/companies?_quantity=20")
        .then((res: any) => res?.data?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (searchParams?.size === 0) return;
    onOpen();
  }, [searchParams]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">List of Companies</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 mt-4">
            {companyData?.map((company: any) => (
              <li
                key={company.id}
                className="bg-white shadow-md p-4 cursor-pointer"
                onClick={() => {
                  setSearchParams({
                    company: company?.id,
                  });
                }}
              >
                <img
                  src={comapnyImage}
                  alt={company?.name}
                  className="w-20 h-20 mx-auto mb-2 rounded-full"
                />
                <p className="text-lg font-semibold">{company.name}</p>
                <p className="text-gray-600">{company.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CompanyDetails
        onClose={onClose}
        isOpen={isOpen}
        searchParams={searchParams}
        companyData={companyData}
      />
    </>
  );
};

export default Company;
