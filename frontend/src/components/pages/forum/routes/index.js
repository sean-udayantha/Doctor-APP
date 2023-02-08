import React from "react";
import { Navigate } from "react-router-dom";
import ForumHomePage from "../views";
import AddPatient from "../views/AddPatient";
import AddPost from "../views/AddPost";
import ForumBreadcrumbs from "../views/components/Breadcrumbs";
import EditPost from "../views/EditPost";
import ViewOnePatient from "../views/ViewOnePatient";
import ViewPatient from "../views/ViewPatient";
// import ViewOne from "../views/ViewPosts/ViewOne";

const ForumRoutes = [
  {
    path: "forum",
    element: <ForumBreadcrumbs />,
    children: [
      { path: "", element: <Navigate to="view" /> },
      // { path: "view", element: <ForumHomePage /> },
      { path: "view", element: <ViewPatient/> },
      // { path: "add", element: <AddPost /> },
      { path: "add", element: <AddPatient /> },
      { path: "edit/:id", element: <EditPost /> },
      { path: "view/:id", element: <ViewOnePatient/> },
    ],
  },
  // { path: "forum", element: <ForumHomePage /> },
  // { path: "forum/add", element: <AddPost /> },
];

export default ForumRoutes;
