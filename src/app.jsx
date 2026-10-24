import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Journey from '@/pages/Journey';
import Guidebooks from '@/pages/Guidebooks';
import GuidebookAdvanced from '@/pages/GuidebookAdvanced';
import Resources from '@/pages/Resources';
import StudyCenter from '@/pages/StudyCenter';
import Schools from '@/pages/Schools';
import BoardPrep from '@/pages/BoardPrep';
import Billets from '@/pages/Billets';
import RanksGuide from '@/pages/RanksGuide';
import Events from '@/pages/Events';
import Awards from '@/pages/Awards';
import VeteranAdvice from '@/pages/VeteranAdvice';
import PersonalAdvice from '@/pages/PersonalAdvice';
import Serve360 from '@/pages/Serve360';
import Coach from '@/pages/Coach';
import About from '@/pages/About';
import AdminCurriculum from '@/pages/AdminCurriculum';
import AdminRibbons from '@/pages/AdminRibbons';
import AdminHome from '@/pages/AdminHome';
import AdminAdvice from '@/pages/AdminAdvice';
import AdminContent from '@/pages/AdminContent';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/guidebooks" element={<Guidebooks />} />
        <Route path="/guidebooks/advanced" element={<GuidebookAdvanced />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/study" element={<StudyCenter />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/board" element={<BoardPrep />} />
        <Route path="/billets" element={<Billets />} />
        <Route path="/roles" element={<RanksGuide />} />
        <Route path="/events" element={<Events />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/veteran-advice" element={<VeteranAdvice />} />
        <Route path="/advice" element={<PersonalAdvice />} />
        <Route path="/serve360" element={<Serve360 />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/curriculum" element={<AdminCurriculum />} />
        <Route path="/admin/ribbons" element={<AdminRibbons />} />
        <Route path="/admin/advice" element={<AdminAdvice />} />
        <Route path="/admin/content" element={<AdminContent />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
