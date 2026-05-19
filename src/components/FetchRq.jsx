import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { deletePostAPI, fetchDataAPI, updatePostAPI } from "../services/api";
import { NavLink } from "react-router-dom";

const FetchRq = () => {
  const [pageNo, setPageNo] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNo],
    queryFn: () => fetchDataAPI(pageNo),
    placeholderData: keepPreviousData,
  });
  const QueryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePostAPI(id),
    onSuccess: (data, id) => {
      QueryClient.setQueryData(["posts", pageNo], (curData) => {
        return curData?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePostAPI(id),
    onSuccess: (data, id) => {
      QueryClient.setQueriesData(["posts", pageNo], (posts) => {
        return posts.map((p) => {
          return p.id === id ? { ...p, title: "this post updated" } : p;
        });
      });
    },
  });
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
                <button onClick={() => deleteMutation.mutate(id)}>
                  Delete
                </button>
                <button onClick={() => updateMutation.mutate(id)}>
                  Update
                </button>
              </li>
            );
          })}
        </ul>
        <div className="pagination-section container">
          <button
            disabled={pageNo === 0 ? true : false}
            onClick={() => setPageNo((prev) => prev - 3)}
          >
            Prev
          </button>
          <p>{pageNo / 3 + 1}</p>
          <button onClick={() => setPageNo((prev) => prev + 3)}>Next</button>
        </div>
      </div>
    </>
  );
};

export default FetchRq;
