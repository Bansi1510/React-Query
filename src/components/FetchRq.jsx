import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchDataAPI } from "../services/api";
import { NavLink } from "react-router-dom";

const FetchRq = () => {
  const fetchData = async () => {
    try {
      const res = await fetchDataAPI();
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    gcTime: 2000,
  });
  console.log(error);
  if (isLoading) return <p>Loading data</p>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <>
      <div>
        <ul className="section-accordion">
          {data?.map((elem) => {
            const { id, title, body } = elem;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default FetchRq;
