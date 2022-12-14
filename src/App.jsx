import { Routes, Route } from "react-router-dom";
import React, { Suspense, Fragment, useContext } from "react";

import AuthContext from "./context/AuthContext";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Layout from "./components/Layout/Layout";

const LandingPage = React.lazy(() => import("./Pages/LandingPage/LandingPage"));
const ForgotPassword = React.lazy(() => import("./Pages/UserFormPages/ForgotPassword"));
const Login = React.lazy(() => import("./Pages/UserFormPages/Login"));
const ResetPassword = React.lazy(() => import("./Pages/UserFormPages/ResetPassword"));
const SignUp = React.lazy(() => import("./Pages/UserFormPages/SignUp"));
const ProfilePage = React.lazy(() => import("./Pages/ProfilePages/ProfilePage"));
const ProfileResetPasswordPage = React.lazy(() => import("./Pages/ProfilePages/ProfileResetPasswordPage"));
const ProgramsPage = React.lazy(() => import("./Pages/ProgramPages/ProgramsPage"));
const ProgramPage = React.lazy(() => import("./Pages/ProgramPages/ProgramPage"));
const ActivitiesPage = React.lazy(() => import("./Pages/WorkoutPages/ActivitesPage"));
const DailyWorkoutPage = React.lazy(() => import("./Pages/WorkoutPages/DailyWorkoutPage"));
const RewardsPage = React.lazy(() => import("./Pages/RewardPages/RewardsPage"));
const MembersPage = React.lazy(() => import("./Pages/MemberPages/MembersPage"));
const MemberPage = React.lazy(() => import("./Pages/MemberPages/MemberPage"));
const UpdateProfilePage = React.lazy(() => import("./Pages/ProfilePages/UpdateProfilePage"));
// const AddProgramPage = React.lazy(() => import("./Pages/AdminFormPages/AddProgramPage"));
const LibraryItemsPage = React.lazy(() => import("./Pages/LibraryPages/LibraryItemsPage"));
const LibraryItemPage = React.lazy(() => import("./Pages/LibraryPages/LibraryItemPage"));
const NotFoundPage = React.lazy(() => import("./Pages/ErrorPages/NotFoundPage"));
const PurchasePage = React.lazy(() => import("./Pages/ProgramPages/PurchasePage"));
const AddWorkoutPage = React.lazy(() => import("./Pages/AdminFormPages/AddWorkout"));
const FinishedPage = React.lazy(() => import("./Pages/WorkoutPages/FinishedPage"));
const ProgramCreate = React.lazy(() => import("./Pages/ProgramPages/ProgramCreate"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="profile/change-password"
            element={<ProfileResetPasswordPage />}
          />
          <Route path="reset_password" element={<ResetPassword />} />
          {!authCtx.isLoggedIn && !authCtx.isAdmin && (
            <Fragment>
              <Route path="programs" element={<LandingPage />} />
              <Route path="programs/:programId" element={<LandingPage />} />
              <Route
                path="programs/:programId/purchase"
                element={<LandingPage />}
              />
              <Route path="activities" element={<LandingPage />} />
              <Route path="activities/workout" element={<LandingPage />} />
              <Route path="rewards" element={<LandingPage />} />
              <Route path="profile" element={<LandingPage />} />
              <Route path="profile/update" element={<LandingPage />} />
            </Fragment>
          )}

          {authCtx.isLoggedIn && (
            <Fragment>
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="programs/:programId" element={<ProgramPage />} />
              <Route
                path="programs/:programId/purchase"
                element={<PurchasePage />}
              />
              <Route path="activities" element={<ActivitiesPage />} />
              <Route path="activites/workout-finished" element={<FinishedPage workout={true} />}/>
              <Route path="activites/day-finished" element={<FinishedPage workout={false} />}/>
              <Route
                path="activities/:workoutId"
                element={<DailyWorkoutPage />}
              />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/update" element={<UpdateProfilePage />} />
            </Fragment>
          )}
          {authCtx.isAdmin && (
            <Fragment>
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="programs/:programId" element={<ProgramPage />} />
              <Route
                path="programs/:programId/purchase"
                element={<PurchasePage />}
              />
              <Route path="programs/add-program" element={<ProgramCreate />} />
              <Route
                path="programs/add-program/add-workout"
                element={<AddWorkoutPage />}
              />
              <Route path="add-workout" element={<AddWorkoutPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="members/:memberId" element={<MemberPage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="library" element={<LibraryItemsPage />} />
              <Route path="library/:libraryId" element={<LibraryItemPage />} />
            </Fragment>
          )}
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
