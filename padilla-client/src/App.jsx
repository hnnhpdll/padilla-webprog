import React from "react";
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from './pages/LandingPages/ArticlePage'; 
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import HomePage from './pages/LandingPages/HomePage'; 
import AboutPage from './pages/LandingPages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import DashLayout from "./layouts/DashLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";

const routes = [
  {
    path: '/', 
    element: <Layout />, 
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about', 
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
      
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      }
    ],
  },
  {
  path: "/dashboard",
  element: (
    <ProtectedRoute allowedRoles={["admin", "editor"]}>
      <DashLayout />
    </ProtectedRoute>
  ),
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
    {
      path: "reports",
      element: (
        <ProtectedRoute allowedRoles={["admin", "editor"]}>
          <ReportsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "users",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <UsersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "articles",
      element: (
        <ProtectedRoute allowedRoles={["admin", "editor"]}>
          <DashArticleListPage />
        </ProtectedRoute>
      ),
    },
  ],
},
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;