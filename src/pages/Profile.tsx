import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import personImage from "../assets/person.jfif";

const Profile = () => {
  const {
    data: person,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      return await axios
        .get(
          "https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_star"
        )
        .then((res: any) => res?.data?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <div className="bg-white p-8 rounded shadow-md max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {person?.[0]?.firstname} {person?.[0]?.lastname}
            </h2>
            <img
              src={personImage}
              alt={`${person?.[0]?.firstname} ${person?.[0]?.lastname}`}
              className="w-20 h-20 rounded-full"
            />
          </div>
          <p className="text-gray-600">Email: {person?.[0]?.email}</p>
          <p className="text-gray-600">Phone: {person?.[0]?.phone}</p>
          <p className="text-gray-600">Birthday: {person?.[0]?.birthday}</p>
          <p className="text-gray-600">Gender: {person?.[0]?.gender}</p>
          <h3 className="text-lg font-semibold mt-6">Address:</h3>
          <p className="text-gray-600">
            {person?.[0]?.address.street}, {person?.[0]?.address.city},{" "}
            {person?.[0]?.address.country}
          </p>
          <p className="text-gray-600">
            ZIP Code: {person?.[0]?.address.zipcode}
          </p>
          <p className="text-gray-600">
            County: {person?.[0]?.address.county_code}
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold">Website:</p>
            <a
              href={person?.[0]?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {person?.[0]?.website}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
