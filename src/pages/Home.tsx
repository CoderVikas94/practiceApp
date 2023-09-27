import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@nextui-org/react";

const Home = () => {
  const { data: imagesData, isLoading: imageLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return await axios
        .get("https://picsum.photos/v2/list?page=1&limit=4")
        .then((res: any) => res?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: booksData, isLoading: bookLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await axios
        .get("https://fakerapi.it/api/v1/books?_quantity=4")
        .then((res: any) => res?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: productsData, isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await axios
        .get(
          "https://fakerapi.it/api/v1/products?_quantity=1&_taxes=12&_categories_type=uuid"
        )
        .then((res: any) => res?.data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="p-4 min-h-screen">
      <section className="mt-8 h-full">
        <h2 className="text-2xl font-semibold mb-4">Random Images Grid</h2>
        {imageLoading || bookLoading || productLoading ? (
          <div className="w-full h-screen">
            <h2 className="text-[20px]">Loading...</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {imagesData?.map((imageUrl: any, index: any) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <Image
                  shadow="sm"
                  radius="sm"
                  width="100%"
                  alt={`Random ${index}`}
                  className="w-full object-cover h-[100%]"
                  src={imageUrl?.download_url}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">List of Books</h2>
        {bookLoading && !imageLoading ? (
          <div className="w-full h-[200px]">
            <h2 className="text-[20px]">Loading...</h2>
          </div>
        ) : (
          <ul className="space-y-4">
            {booksData?.data?.length > 0 &&
              booksData?.data?.map((book: any, index: any) => (
                <li key={index} className="bg-white shadow-md p-4">
                  <div className="w-full flex items-center justify-center">
                    <Image
                      shadow="sm"
                      radius="sm"
                      width="100%"
                      alt={`Random ${index}`}
                      className="w-[100%] h-[30%] object-cover"
                      src={"https://picsum.photos/300/300"}
                    />
                  </div>

                  <p className="text-lg font-semibold">{book?.title}</p>
                  <p className="text-gray-600">{book?.author}</p>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {productLoading ? (
          <div className="w-full h-[200px]">
            <h2 className="text-[20px]">Loading...</h2>
          </div>
        ) : (
          <ul className="space-y-4">
            {productsData?.data?.length > 0 &&
              productsData?.data?.map((product: any, index: number) => (
                <li key={index} className="bg-white shadow-md p-4">
                  <div className="w-full flex items-center justify-center">
                    <Image
                      shadow="sm"
                      radius="sm"
                      width="100%"
                      alt={`Random ${index}`}
                      className="w-[100%] h-[30%] object-cover"
                      src={"https://picsum.photos/300/300/?grayscale"}
                    />
                  </div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-gray-600">Price: {product.price}</p>
                  <p className="text-gray-600">Category: {product.category}</p>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
