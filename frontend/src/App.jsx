import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SaasAdminOverviewPage from './pages/saas-admin/SaasAdminOverviewPage';
import CompanyMasterPage from './pages/saas-admin/CompanyMasterPage';
import AddNewCompanyPage from './pages/saas-admin/AddNewCompanyPage';
import CompanyViewPage from './pages/saas-admin/CompanyViewPage';
import PlanMasterPage from './pages/saas-admin/PlanMasterPage';
import AddEditPlanPage from './pages/saas-admin/AddEditPlanPage';
import PlanViewPage from './pages/saas-admin/PlanViewPage';
import CompanyAdminUnderDevPage from './pages/company-admin/CompanyAdminUnderDevPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* SaaS Platform / Super Admin routes */}
        <Route path="/saas-admin" element={<SaasAdminOverviewPage />} />
        <Route path="/saas-admin/overview" element={<Navigate to="/saas-admin" replace />} />
        
        {/* Company Master routes */}
        <Route path="/saas-admin/company-master" element={<CompanyMasterPage />} />
        <Route path="/saas-admin/company-master/add" element={<AddNewCompanyPage />} />
        <Route path="/saas-admin/company-master/view/:id" element={<CompanyViewPage />} />
        <Route path="/saas-admin/company-master/view" element={<CompanyViewPage />} />
        <Route path="/saas-admin/company-master/edit/:id" element={<AddNewCompanyPage />} />
        <Route path="/saas-admin/organizations" element={<Navigate to="/saas-admin/company-master" replace />} />
        
        {/* Plan Master routes */}
        <Route path="/saas-admin/plan-master" element={<PlanMasterPage />} />
        <Route path="/saas-admin/plan-master/add" element={<AddEditPlanPage />} />
        <Route path="/saas-admin/plan-master/edit/:code" element={<AddEditPlanPage />} />
        <Route path="/saas-admin/plan-master/view/:code" element={<PlanViewPage />} />
        <Route path="/saas-admin/plan-master/view" element={<PlanViewPage />} />
        <Route path="/saas-admin/plans" element={<Navigate to="/saas-admin/plan-master" replace />} />
        
        {/* Company Admin (Tenant) routes */}
        <Route path="/company-admin" element={<CompanyAdminUnderDevPage />} />
        <Route path="/company-admin/*" element={<CompanyAdminUnderDevPage />} />

        {/* Fallback route */}
        <Route path="/saas-admin/*" element={<SaasAdminOverviewPage />} />
      </Routes>
    </Router>
  );
}
