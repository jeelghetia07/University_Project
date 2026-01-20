import { useState } from 'react';
import { Search, BookOpen, Users, Clock, MapPin, Filter, CheckCircle, AlertCircle, X, User, Mail, Hash, UserCircle } from 'lucide-react';
import { availableCourses, enrolledCourses as initialEnrolled, currentUser } from '../data/mockData';

const CourseRegistration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolled);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Registration Form Data
  const [registrationData, setRegistrationData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    rollNumber: currentUser.id,
    gender: ''
  });

  // Get unique departments and semesters
  const departments = ['All', ...new Set(availableCourses.map(c => c.department))];
  const semesters = ['All', ...new Set(availableCourses.map(c => c.semester))];

  // Filter courses
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || course.department === selectedDepartment;
    const matchesSemester = selectedSemester === 'All' || course.semester === parseInt(selectedSemester);
    
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const handleRegistrationFormChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const openRegistrationForm = (course) => {
    // Check if already enrolled
    const alreadyEnrolled = enrolledCourses.some(c => c.courseCode === course.courseCode);
    
    if (alreadyEnrolled) {
      showNotification('error', 'Already enrolled in this course!');
      return;
    }

    // Check if course is full
    if (course.enrolled >= course.capacity) {
      showNotification('error', 'Course is full!');
      return;
    }

    setSelectedCourse(course);
    setShowRegistrationModal(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!registrationData.name || !registrationData.email || !registrationData.rollNumber || !registrationData.gender) {
      showNotification('error', 'Please fill all fields!');
      return;
    }

    // Add to enrolled courses
    const newEnrollment = {
      id: selectedCourse.id,
      courseName: selectedCourse.courseName,
      courseCode: selectedCourse.courseCode,
      credits: selectedCourse.credits,
      faculty: selectedCourse.faculty,
      schedule: selectedCourse.schedule,
      room: selectedCourse.room,
      attendance: 0,
      grade: '-',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setEnrolledCourses([...enrolledCourses, newEnrollment]);
    setShowRegistrationModal(false);
    setShowSuccessModal(true);

    // Reset gender field for next registration
    setRegistrationData({
      ...registrationData,
      gender: ''
    });

    // Auto close success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const handleDrop = (courseCode) => {
    setEnrolledCourses(enrolledCourses.filter(c => c.courseCode !== courseCode));
    showNotification('success', 'Course dropped successfully!');
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const openCourseDetailsModal = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  const isEnrolled = (courseCode) => {
    return enrolledCourses.some(c => c.courseCode === courseCode);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Course Registration</h1>
        <p className="text-indigo-100">Browse and register for available courses</p>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-xl flex items-center space-x-3 animate-fadeIn ${
          notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-600" />
          )}
          <span className={`font-medium ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
            {notification.message}
          </span>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Successfully Enrolled! 🎉</h2>
            <p className="text-slate-600 mb-6">
              You have been successfully enrolled in
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-lg text-green-900 mb-1">{selectedCourse.courseName}</h3>
              <p className="text-sm text-green-700">{selectedCourse.courseCode}</p>
              <p className="text-sm text-green-600 mt-2">{selectedCourse.faculty}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-600 mb-1">Student Details</p>
              <p className="font-semibold text-slate-900">{registrationData.name}</p>
              <p className="text-sm text-slate-600">{registrationData.rollNumber}</p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {showRegistrationModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Course Registration</h2>
                  <p className="text-indigo-100">{selectedCourse.courseName}</p>
                </div>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-indigo-700">
                  Please confirm your details to complete the registration
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={registrationData.name}
                    onChange={handleRegistrationFormChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationFormChange}
                    placeholder="your.email@university.edu"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="rollNumber"
                    value={registrationData.rollNumber}
                    onChange={handleRegistrationFormChange}
                    placeholder="STU2024001"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select
                    name="gender"
                    value={registrationData.gender}
                    onChange={handleRegistrationFormChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Course Info Summary */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Course Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Course Code:</span>
                    <span className="font-medium text-slate-900">{selectedCourse.courseCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Credits:</span>
                    <span className="font-medium text-slate-900">{selectedCourse.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Faculty:</span>
                    <span className="font-medium text-slate-900">{selectedCourse.faculty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Schedule:</span>
                    <span className="font-medium text-slate-900">{selectedCourse.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enrolled Courses Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">My Enrolled Courses</h2>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
            {enrolledCourses.length} / 6 Courses
          </span>
        </div>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map(course => (
              <div key={course.courseCode} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{course.courseName}</h3>
                    <p className="text-sm text-slate-600">{course.courseCode}</p>
                  </div>
                  <button
                    onClick={() => handleDrop(course.courseCode)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">{course.credits} Credits • {course.faculty}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No courses enrolled yet. Browse available courses below!</p>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, code, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Semester Filter */}
          <div>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
            >
              <option value="All">All Semesters</option>
              {semesters.filter(s => s !== 'All').map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Available Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Available Courses ({filteredCourses.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map(course => {
            const enrolled = isEnrolled(course.courseCode);
            const isFull = course.enrolled >= course.capacity;
            const availableSeats = course.capacity - course.enrolled;

            return (
              <div key={course.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{course.courseName}</h3>
                    <p className="text-sm text-slate-600">{course.courseCode}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      enrolled ? 'bg-green-100 text-green-700' :
                      isFull ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {enrolled ? 'Enrolled' : isFull ? 'Full' : `${availableSeats} Seats Left`}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.faculty}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{course.room}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => openCourseDetailsModal(course)}
                    className="flex-1 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openRegistrationForm(course)}
                    disabled={enrolled || isFull}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      enrolled || isFull
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  >
                    {enrolled ? 'Enrolled' : isFull ? 'Full' : 'Register'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg">No courses found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCourse.courseName}</h2>
                  <p className="text-indigo-100">{selectedCourse.courseCode}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Credits</p>
                  <p className="text-xl font-bold text-slate-900">{selectedCourse.credits}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Available Seats</p>
                  <p className="text-xl font-bold text-slate-900">
                    {selectedCourse.capacity - selectedCourse.enrolled} / {selectedCourse.capacity}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Course Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Faculty</p>
                      <p className="font-medium text-slate-900">{selectedCourse.faculty}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Schedule</p>
                      <p className="font-medium text-slate-900">{selectedCourse.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Location</p>
                      <p className="font-medium text-slate-900">{selectedCourse.room}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600">{selectedCourse.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Prerequisites</h3>
                <p className="text-slate-600">{selectedCourse.prerequisites}</p>
              </div>

              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openRegistrationForm(selectedCourse);
                }}
                disabled={isEnrolled(selectedCourse.courseCode) || selectedCourse.enrolled >= selectedCourse.capacity}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isEnrolled(selectedCourse.courseCode) || selectedCourse.enrolled >= selectedCourse.capacity
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {isEnrolled(selectedCourse.courseCode) ? 'Already Enrolled' : 
                 selectedCourse.enrolled >= selectedCourse.capacity ? 'Course Full' : 
                 'Register for this Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRegistration;