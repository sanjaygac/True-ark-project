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
import CompanyAdminDashboardPage from './pages/company-admin/CompanyAdminDashboardPage';
import CompanyValuationsPage from './pages/company-admin/CompanyValuationsPage';
import ValuationFormPartAPage from './pages/company-admin/ValuationFormPartAPage';
import ValuationFormPartBPage from './pages/company-admin/ValuationFormPartBPage';
import ValuationFormPartCPage from './pages/company-admin/ValuationFormPartCPage';
import CompanyApprovalsPage from './pages/company-admin/CompanyApprovalsPage';
import CompanyPermissionMatrixPage from './pages/company-admin/CompanyPermissionMatrixPage';
import CompanyUserMasterPage from './pages/company-admin/CompanyUserMasterPage';
import AddNewUserPage from './pages/company-admin/AddNewUserPage';
import CompanyReportViewPage from './pages/company-admin/CompanyReportViewPage';
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
        
        {/* Company Admin (Tenant) routes - strictly isolated from SaaS Product Admin */}
        <Route path="/company-admin" element={<CompanyAdminDashboardPage />} />
        <Route path="/company-admin/dashboard" element={<Navigate to="/company-admin" replace />} />
        <Route path="/company-admin/valuation" element={<CompanyValuationsPage />} />
        <Route path="/company-admin/valuation/new" element={<ValuationFormPartAPage />} />
        <Route path="/company-admin/valuation/new/part-b" element={<ValuationFormPartBPage />} />
        <Route path="/company-admin/valuation/part-b" element={<Navigate to="/company-admin/valuation/new/part-b" replace />} />
        <Route path="/company-admin/valuation/new/part-c" element={<ValuationFormPartCPage />} />
        <Route path="/company-admin/valuation/part-c" element={<Navigate to="/company-admin/valuation/new/part-c" replace />} />
        <Route path="/company-admin/new-valuation" element={<ValuationFormPartAPage />} />
        <Route path="/company-admin/approval" element={<CompanyApprovalsPage />} />
        <Route path="/company-admin/masters/user" element={<CompanyUserMasterPage />} />
        <Route path="/company-admin/masters/user/add" element={<AddNewUserPage />} />
        <Route path="/company-admin/user-master" element={<Navigate to="/company-admin/masters/user" replace />} />
        <Route path="/company-admin/users/add" element={<Navigate to="/company-admin/masters/user/add" replace />} />
        <Route path="/company-admin/permission-matrix" element={<CompanyPermissionMatrixPage />} />
        <Route path="/company-admin/reports" element={<CompanyReportViewPage />} />
        <Route path="/company-admin/reports/:id" element={<CompanyReportViewPage />} />
        <Route path="/company-admin/*" element={<CompanyAdminUnderDevPage />} />

        {/* Fallback route */}
        <Route path="/saas-admin/*" element={<SaasAdminOverviewPage />} />
      </Routes>
    </Router>
  );
}
