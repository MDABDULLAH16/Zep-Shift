import { useEffect, useState } from "react";
import useAxios from "./../../../hooks/useAxiosSecure";
import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {data:parcels=[],isLoading} = useQuery({
    queryKey: ["/parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  // const [parcels, setParcels] = useState([]);

  // useEffect(() => {
  //   axiosSecure
  //     .get(`/parcels?email=${user.email}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setParcels(res.data); // save to state if needed
  //     })
  //     .catch((err) => console.log("Error fetching parcels:", err));
  // }, [axiosSecure]); // dependency on axios instance

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      <h1>My Parcels</h1>
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel._id}>{parcel?.parcelName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyParcels;
