import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import StudentSubjectView from "./views/Students/ViewSubjects.vue";

import StudentHome from "./views/studentHome.vue";
import AdminHome from "./views/adminHome.vue";
import TutorHome from "./views/tutorHome.vue";
import Schedule from "./views/schedule.vue";
import Availability from "./views/availability.vue";
import Attendance from "./views/attendance.vue";
import SubjectList from "./views/subjectList.vue";
import Requests from "./views/requestList.vue";
import Booking from "./views/booking.vue";
import SessionList from "./views/Sessions.vue";
//apply for tutor?
import StudentList from "./views/studentList.vue";
import TutorList from "./views/tutorList.vue";
import Mentees from "./views/mentees.vue";
import TutorAddSubjects from "./views/TutorAddSubject.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/tutorapp/",
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/student/subjects",
      name: "studentSubjectView",
      component: StudentSubjectView,
    },
    //Student Routes
    {
      path: "/student",
      name: "student",
      component: StudentHome,
    },
    //do we include subjects or tutors as a page or on booking?
    {
      path: "/student/booking",
      name: "booking",
      component: Booking,
    },
    {
      path: "/student/sessions",
      name: "sessions",
      component: SessionList,
    },

    //Admin Routes
    {
      path: "/admin",
      name: "admin",
      component: AdminHome,
    },
    {
      path: "/admin/students",
      name: "students",
      component: StudentList,
    },
    {
      path: "/admin/tutors",
      name: "tutors",
      component: TutorList,
    },
    {
      path: "/admin/mentees",
      name: "mentees",
      component: Mentees,
    },
    {
      path: "/admin/sessions",
      name: "sessions",
      component: SessionList,
    },
    {
      path: "/admin/requests",
      name: "requests",
      component: Requests,
    },
    //Tutor Routes
    {
      path: "/tutor",
      name: "tutor",
      component: TutorHome,
    },
    {
      path: "/tutor/schedule",
      name: "schedule",
      component: Schedule,
    },
    {
      path: "/tutor/schedule/availability",
      name: "availability",
      component: Availability,
    },
    {
      path: "/tutor/schedule/attendance",
      name: "attendance",
      component: Attendance,
    },
    {
      path: "/tutor/subjects",
      name: "subject",
      component: SubjectList,
    },
    {
      path: "/tutor/requests",
      name: "request",
      component: Requests,
    },
    {
      path: "/tutor/sessions",
      name: "sessions",
      component: SessionList,
    },
    {
      path: "/addsubjects",
      name: "addSubjects",
      component: TutorAddSubjects,
    },
  ],
});
