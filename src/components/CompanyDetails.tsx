import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import companyImage from "../assets/company.jpg";
import { useEffect, useState } from "react";

const companyDetails = ({
  searchParams,
  isOpen,
  onClose,
  companyData,
}: any) => {
  const [companyDetails, setcompanyDetails]: any = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const companyId = searchParams.get("company");
    let data = companyData?.filter((company: any) => company.id == companyId);
    setcompanyDetails(data);
  }, [isOpen]);

  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {companyDetails?.[0]?.name}{" "}
              </ModalHeader>
              <ModalBody>
                <img
                  src={companyImage}
                  alt={companyDetails?.[0]?.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold">Email:</p>
                    <p>{companyDetails?.[0]?.email}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">VAT:</p>
                    <p>{companyDetails?.[0]?.vat}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Phone:</p>
                    <p>{companyDetails?.[0]?.phone}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Country:</p>
                    <p>{companyDetails?.[0]?.country}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6">Addresses:</h3>
                <ul className="mt-2">
                  {companyDetails?.[0]?.addresses?.map((address: any) => (
                    <li key={address?.id}>
                      {address?.street}, {address?.city}, {address?.country}
                    </li>
                  ))}
                </ul>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default companyDetails;
