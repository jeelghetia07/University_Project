import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

// Temporary placeholder component for other pages
const ComingSoon = ({ pageName }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{pageName}</h2>
      <p className="text-slate-600">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><ComingSoon pageName="My Profile" /></Layout>} />
        <Route path="/course-registration" element={<Layout><ComingSoon pageName="Course Registration" /></Layout>} />
        <Route path="/my-courses" element={<Layout><ComingSoon pageName="My Courses" /></Layout>} />
        <Route path="/timetable" element={<Layout><ComingSoon pageName="Timetable" /></Layout>} />
        <Route path="/attendance" element={<Layout><ComingSoon pageName="Attendance" /></Layout>} />
        <Route path="/grades" element={<Layout><ComingSoon pageName="Grades" /></Layout>} />
        <Route path="/fees" element={<Layout><ComingSoon pageName="Fees" /></Layout>} />
        <Route path="/announcements" element={<Layout><ComingSoon pageName="Announcements" /></Layout>} />
        <Route path="/faculty" element={<Layout><ComingSoon pageName="Faculty Directory" /></Layout>} />
        <Route path="/library" element={<Layout><ComingSoon pageName="Library" /></Layout>} />
        <Route path="/exams" element={<Layout><ComingSoon pageName="Exams" /></Layout>} />
        <Route path="/events" element={<Layout><ComingSoon pageName="Events" /></Layout>} />
        <Route path="/support" element={<Layout><ComingSoon pageName="Support" /></Layout>} />
        <Route path="/settings" element={<Layout><ComingSoon pageName="Settings" /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;