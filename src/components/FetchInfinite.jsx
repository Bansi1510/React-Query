import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchUsers } from "../services/api";
import { useInView } from "react-intersection-observer";

const FetchInfinite = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPages, allPages) => {
        return lastPages.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;
  return (
    <div>
      {" "}
      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Scroll down to load more"
            : "No more users"}
      </div>
    </div>
  );
};

export default FetchInfinite;
