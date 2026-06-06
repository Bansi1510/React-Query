import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import FetchOld from "./components/FetchOld";
import FetchRq from "./components/FetchRq";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchIndv } from "./components/FetchIndv";
import FetchInfinite from "./components/FetchInfinite";
const appRouter = new createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRq />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite",
        element: <FetchInfinite />,
      },
    ],
  },
]);
const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
        <RouterProvider router={appRouter}></RouterProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
