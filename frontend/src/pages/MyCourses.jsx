import { useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  MapPin,
  Award,
  TrendingUp,
  Calendar,
  FileText,
  X,
  Download,
} from "lucide-react";
import { enrolledCourses } from "../data/mockData";

const MyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [facultyMessage, setFacultyMessage] = useState("");

  const openCourseDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  // Calculate total credits
  const totalCredits = enrolledCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  // Get attendance status
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return { color: "green", text: "Excellent" };
    if (percentage >= 75) return { color: "blue", text: "Good" };
    if (percentage >= 65) return { color: "yellow", text: "Warning" };
    return { color: "red", text: "Critical" };
  };

  // Get grade color
  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "green";
    if (grade === "B+" || grade === "B") return "blue";
    if (grade === "C+" || grade === "C") return "yellow";
    return "slate";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-purple-100">View and manage your enrolled courses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {enrolledCourses.length}
          </h3>
          <p className="text-sm text-slate-600 mt-1">Total Courses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              Semester 5
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{totalCredits}</h3>
          <p className="text-sm text-slate-600 mt-1">Total Credits</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Average
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {(
              enrolledCourses.reduce((sum, c) => sum + c.attendance, 0) /
              enrolledCourses.length
            ).toFixed(0)}
            %
          </h3>
          <p className="text-sm text-slate-600 mt-1">Overall Attendance</p>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Enrolled Courses</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all">
            <Download className="w-4 h-4" />
            <span className="text-sm font-semibold">Download Schedule</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((course) => {
            const attendanceStatus = getAttendanceStatus(course.attendance);
            const gradeColor = getGradeColor(course.grade);

            return (
              <div
                key={course.courseCode}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => openCourseDetails(course)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {course.courseName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {course.courseCode}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-${gradeColor}-100 text-${gradeColor}-700`}
                      >
                        Grade: {course.grade}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <Users className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{course.faculty}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{course.room}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Award className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{course.credits} Credits</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="lg:w-64 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Attendance
                        </span>
                        <span
                          className={`text-sm font-bold text-${attendanceStatus.color}-600`}
                        >
                          {course.attendance}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`bg-${attendanceStatus.color}-500 h-2 rounded-full transition-all`}
                          style={{ width: `${course.attendance}%` }}
                        ></div>
                      </div>
                      <p
                        className={`text-xs text-${attendanceStatus.color}-600 font-medium mt-1`}
                      >
                        {attendanceStatus.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedCourse.courseName}
                  </h2>
                  <p className="text-purple-100">{selectedCourse.courseCode}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCourse.credits}
                  </p>
                  <p className="text-xs text-slate-600">Credits</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCourse.attendance}%
                  </p>
                  <p className="text-xs text-slate-600">Attendance</p>
                </div>
                <div
                  className={`bg-${getGradeColor(selectedCourse.grade)}-50 rounded-lg p-4 text-center`}
                >
                  <FileText
                    className={`w-8 h-8 text-${getGradeColor(selectedCourse.grade)}-600 mx-auto mb-2`}
                  />
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCourse.grade}
                  </p>
                  <p className="text-xs text-slate-600">Current Grade</p>
                </div>
              </div>

              {/* Course Information */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                  Course Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-slate-50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">Instructor</p>
                      <p className="font-medium text-slate-900">
                        {selectedCourse.faculty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-slate-50 rounded-lg p-4">
                    <Clock className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">
                        Class Schedule
                      </p>
                      <p className="font-medium text-slate-900">
                        {selectedCourse.schedule}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-slate-50 rounded-lg p-4">
                    <MapPin className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">Classroom</p>
                      <p className="font-medium text-slate-900">
                        {selectedCourse.room}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-slate-50 rounded-lg p-4">
                    <Calendar className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">
                        Enrollment Date
                      </p>
                      <p className="font-medium text-slate-900">
                        {new Date(
                          selectedCourse.enrollmentDate,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Details */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                  Attendance Overview
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-slate-900">
                      Current Attendance
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      {selectedCourse.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                      style={{ width: `${selectedCourse.attendance}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {Math.round((selectedCourse.attendance / 100) * 50)}
                      </p>
                      <p className="text-sm text-slate-600">Classes Attended</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">50</p>
                      <p className="text-sm text-slate-600">Total Classes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button className="py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">
                  View Materials
                </button>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Contact Faculty
                </button>
              </div>
            </div>
          </div>

          {/* Contact Faculty Modal */}
          {showContactModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  Contact {selectedCourse?.faculty}
                </h2>

                <textarea
                  rows="6"
                  placeholder="Write your message to the faculty..."
                  value={facultyMessage}
                  onChange={(e) => setFacultyMessage(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      setFacultyMessage("");
                    }}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      alert("Message sent to faculty!");
                      setShowContactModal(false);
                      setFacultyMessage("");
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
