import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import StudentHome from "./views/Students/studentHome.vue";
import AdminHome from "./views/Admins/adminHome.vue";
import TutorHome from "./views/Tutors/tutorHome.vue";
import StudentSubjectView from "./views/Students/ViewSubjects.vue";

import Schedule from "./views/schedule.vue";
import Availability from "./views/availability.vue";
import Attendance from "./views/attendance.vue";
import SubjectList from "./views/subjectList.vue";
import Requests from "./views/requestList.vue";
import Booking from "./views/booking.vue";
//apply for tutor?
import StudentList from "./views/Students/studentList.vue";

import Mentees from "./views/Students/mentees.vue";
import SessionList from "./views/Sessions.vue";

//User Crud
import UserAdd from "./views/Users/addUser.vue";
import UserEdit from "./views/Users/userEdit.vue";
import UserView from "./views/Users/userView.vue";
import UserList from "./views/Users/userList.vue";

//Tutor Crud
import TutorAdd from "./views/Tutors/addTutor.vue";
import TutorEdit from "./views/Tutors/tutorEdit.vue";
import TutorView from "./views/Tutors/tutorView.vue";
import TutorList from "./views/Tutors/tutorList.vue";

//Student crud





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
      path: "/student/ScheduleSession",
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
      name: "studentSessions",
      component: SessionList,
    },

    //Needs schedule sessions

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

    //users
    {
      path: "/admin/users",
      name: "users",
      component: UserList,
    },
    {
      path: "/admin/users-edit/:id",
      name: "editUser",
      component: UserEdit,
    },
    {
      path: "/admin/users/:id",
      name: "viewUser",
      component: UserView,
    },
    {
      path: "/admin/addUser/",
      name: "addUser",
      component: UserAdd,
    },

    //Tutor
    {
      path: "/admin/tutors",
      name: "tutors",
      component: TutorList,
    },
    {
      path: "/admin/tutors-edit/:id",
      name: "editTutor",
      component: TutorEdit,
    },
    {
      path: "/admin/tutors/:id",
      name: "viewTutor",
      component: TutorView,
    },
    {
      path: "/admin/addTutor/",
      name: "addTutor",
      component: TutorAdd,
    },


    {
      path: "/admin/mentees",
      name: "mentees",
      component: Mentees,
    },
    {
      path: "/admin/sessions",
      name: "adminSessions",
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
      name: "tutorSessions",
      component: SessionList,
    },
  ],
});
