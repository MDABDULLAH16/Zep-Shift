import React from "react";
import useAxios from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxios();
  const {data:parcel,isLoading} = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
    if (isLoading) {
        return <Loader/>
    }
  return (
    <div>
          <h1>Payment page { parcel.parcelName}</h1>
    </div>
  );
};

export default Payment;
