import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import { useSelector } from "react-redux"
import AdminMain from "./pages/admin/AdminMain"
import UserMain from "./pages/user/UserMain"
import RecruiterMain from "./pages/recruiter/RecruiterMain"
import RecruitersPage from "./pages/admin/recruiters/RecruitersPage"
import JobsPage from "./pages/recruiter/jobs/JobsPage"
import NewJob from "./pages/recruiter/jobs/job/NewJob"
import EditJob from "./pages/recruiter/jobs/job/EditJob"

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const isAdmin = user && user.role === "Admin";
  const isRecruiter = user && user.role === "Recruiter";
  const isUser = user && user.role === "User";

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/home" element={isAuth && isAdmin ? <AdminMain /> : <Navigate to="/" />} />
          <Route path="/user/home" element={isAuth && isUser ? <UserMain /> : <Navigate to="/" />} />
          <Route path="/recruiter/home" element={isAuth && isRecruiter ? <RecruiterMain /> : <Navigate to="/" />} />
          <Route path="/admin/recruiters" element={isAuth && isAdmin ? <RecruitersPage /> : <Navigate to="/" />} />
          <Route path="/recruiter/jobs" element={isAuth && isRecruiter ? <JobsPage /> : <Navigate to="/" />} />
          <Route path="/recruiter/jobs/new" element={isAuth && isRecruiter ? <NewJob /> : <Navigate to="/" />} />
          <Route path="/recruiter/jobs/:jobId" element={isAuth && isRecruiter ? <EditJob /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
