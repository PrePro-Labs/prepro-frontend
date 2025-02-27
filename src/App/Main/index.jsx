import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./homepage";
import BreadCrumb from "./components/Breadcrumb";
import Spinner from "./components/Spinner";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
// page imports
const ExerciseLog = lazy(() => import("./fitness/log"));
const AdminConsole = lazy(() => import("./admin"));
const FitnessLogAdmin = lazy(() => import("./fitness/admin"));
const CheckInLogs = lazy(() => import("./checkIns"));
const ActivityLogs = lazy(() => import("./activity"));
const SupplementLogPage = lazy(() => import("./nutrition/supplements/log"));
const WeightLog = lazy(() => import("./nutrition/weight/log"));
const Dashboards = lazy(() => import("./dashboards"));
const DietLog = lazy(() => import("./nutrition/diet"));
const Physique = lazy(() => import("./physique"));
const SleepApp = lazy(() => import("./sleep"));

const Main = ({ user, apps, ...props }) => {
  const location = useLocation();

  const withAuth = (Component, appId) => {
    const match = apps.find((a) => a.id === appId);
    if (match) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Initial scale and opacity
          animate={{ opacity: 1, scale: 1 }} // Target scale and opacity
          exit={{ opacity: 0, scale: 0.8 }} // Exit animation
          transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth transition
        >
          <Component {...props} />
        </motion.div>
      );
    } else {
      if (!user || !apps.length) {
        return <Spinner />;
      } else
        return (
          <Segment>
            <h4>
              You do not have access to this app. Please contact your coach or
              account manager to grant access.
            </h4>
          </Segment>
        );
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <BreadCrumb path={location.pathname} />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Homepage startsWith={"/"} />} />
          <Route path="/admin" element={withAuth(AdminConsole, 1)} />
          <Route path="/fitness/log" element={withAuth(ExerciseLog, 3)} />
          <Route path="/fitness/log/:date" element={withAuth(ExerciseLog, 3)} />
          <Route
            path="/fitness/exercises"
            element={withAuth(FitnessLogAdmin, 4)}
          />
          <Route path="/checkins" element={withAuth(CheckInLogs, 5)} />

          <Route path="/checkins/:date" element={withAuth(CheckInLogs, 5)} />
          <Route path="/activity" element={withAuth(ActivityLogs, 6)} />
          <Route
            path="/nutrition/supplements"
            element={withAuth(SupplementLogPage, 7)}
          />
          <Route
            path="/nutrition/weight/log"
            element={withAuth(WeightLog, 8)}
          />
          <Route
            path="/nutrition/weight/log/:date"
            element={withAuth(WeightLog, 8)}
          />
          <Route path="/dashboards" element={withAuth(Dashboards, 9)} />
          <Route path="/nutrition/diet" element={withAuth(DietLog, 10)} />
          <Route path="/physique" element={withAuth(Physique, 11)} />
          <Route path="/sleep" element={withAuth(SleepApp, 12)} />
          <Route path="/sleep/:maintab" element={withAuth(SleepApp, 12)} />
          <Route
            path="*"
            element={<Homepage startsWith={location.pathname} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.app.user,
    apps: state.app.apps,
  };
}

export default connect(mapStateToProps, {})(Main);
