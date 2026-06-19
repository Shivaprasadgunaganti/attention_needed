import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import OpportunitiesPage from "../pages/OpportunitiesPage";
import ResumeIntelligencePage from "../pages/ResumeIntelligencePage";
import ApplicationPipelinePage from "../pages/ApplicationPipelinePage";
import SkillIntelligencePage from "../pages/SkillIntelligencePage";
import SettingsPage from "../pages/SettingsPage";
// import SettingsPage from "../pages/SettingsPage";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/resume-intelligence" element={<ResumeIntelligencePage />} />
        <Route path="/applications" element={<ApplicationPipelinePage />} />
        <Route path="/skill-intelligence" element={<SkillIntelligencePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;