import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import StudentHome from "./views/Students/studentHome.vue";
import AdminHome from "./views/Admins/adminHome.vue";
import TutorHome from "./views/Tutors/tutorHome.vue";
import StudentSubjectView from "./views/Students/ViewSubjects.vue";
import Request from "./views/Students/Request.vue"
import SupervisorSessionList from "./views/Supervisors/supervisorSessionList.vue";
import supervisorViewSession from "./views/Supervisors/supervisorViewSession.vue";
import Schedule from "./views/schedule.vue";
import Availability from "./views/availability.vue";
import Attendance from "./views/attendance.vue";
import SubjectList from "./views/subjectList.vue";
import Requests from "./views/requestList.vue";
import Booking from "./views/booking.vue";
import RequestView from "./views/viewRequest.vue";
//apply for tutor?
import studentSessionView from "./views/Students/studentViewSession";
import SessionList from "./views/Sessions.vue";
import SessionView from "./views/sessionView.vue";
import userProfileView from "./views/Users/userProfile.vue";
import becomeTutor from "./views/Students/becomeTutor.vue";
import tutorsessionlist from  "./views/Tutors/tutorSessionList.vue";
import SessionsCalender from "./views/Students/SessionsCalender.vue"
import tutorsessiondetails from "./views/Tutors/tutorViewSession.vue";
//User Crud
import UserList from "./views/Users/userList.vue";

//Tutor Crud
import TutorAdd from "./views/Tutors/addTutor.vue";
import TutorEdit from "./views/Tutors/tutorEdit.vue";
import TutorView from "./views/Tutors/tutorView.vue";
import TutorList from "./views/Tutors/tutorList.vue";

//Student crud
import StudentAdd from "./views/Students/addStudent.vue";
import StudentEdit from "./views/Students/studentEdit.vue";
import StudentView from "./views/Students/studentView.vue";
import StudentList from "./views/Students/studentList.vue";
import StudentFeedback from "./views/Students/studentGiveFeedback.vue"
import StudentSessionCalender from "./views/Students/SessionsCalender.vue"

//Mentee Crud
import MenteeAdd from "./views/Mentees/addMentee.vue";
import MenteeEdit from "./views/Mentees/menteeEdit.vue";
import MenteeView from "./views/Mentees/menteeView.vue";
import Mentees from "./views/Mentees/mentees.vue";

//location Crud
import LocationAdd from "./views/Locations/addLocation.vue";
import LocationEdit from "./views/Locations/locationEdit.vue";
import LocationView from "./views/Locations/locationView.vue";
import Locations from "./views/Locations/locations.vue";
//subject crud
import SubjectAdd from "./views/Subjects/addSubject.vue";
import SubjectEdit from "./views/Subjects/subjectEdit.vue";
import SubjectView from "./views/Subjects/subjectView.vue";
import Subjects from "./views/Subjects/subjects.vue";
//Supervisor Crud
import SupervisorAdd from "./views/Supervisors/addSupervisor.vue";
import SupervisorEdit from "./views/Supervisors/supervisorEdit.vue";
import SupervisorView from "./views/Supervisors/supervisorView.vue";
import Supervisors from "./views/Supervisors/supervisors.vue";

import SelectOrg from "./views/selectOrgPage.vue";
//Drop in tutoring
import DropInTutoring from "./views/Students/dropInTutoring.vue";
import DropInTutorList from "./views/Supervisors/dropInTutorList.vue";

//Add New User
import AddNewUser from "./views/addNewUser.vue";


Vue.use(Router);
export default new Router({
  mode: "hash",
  base: process.env.NODE_ENV === "development" ? "/" : "/tutor-frontend/",
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
    {
      path: "/request",
      name: "request",
      component: Request,
      props: true
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
    {
      path: "/student/sessionsCalender",
      name: "studentsessionscalender",
      component: StudentSessionCalender,
    },
    {
      path: "/login/newUser",
      name: "addNewUser",
      component: AddNewUser,
    },

    //Add New User

    //Admin Routes
    {
      path: "/admin",
      name: "admin",
      component: AdminHome,
    },
    {
      path: "/students",
      name: "students",
      component: StudentList,
    },

    //users
    {
      path: "/users",
      name: "users",
      component: UserList,
    },
    // {
    //   path: "/admin/users-edit/:id",
    //   name: "editUser",
    //   component: UserEdit,
    //   props: true
    // },
    // {
    //   path: "/admin/users/:id",
    //   name: "viewUser",
    //   component: UserView,
    //   props: true
    // },
    // {
    //   path: "/admin/addUser/",
    //   name: "addUser",
    //   component: UserAdd,
    // },

    //Supervisors
    //Tutor
    {
      path: "/admin/supervisors",
      name: "supervisors",
      component: Supervisors,
    },
    {
      path: "/admin/supervisors-edit/:id",
      name: "editSupervisor",
      component: SupervisorEdit,
      props: true,
    },
    {
      path: "/admin/supervisors/:id",
      name: "viewSupervisor",
      component: SupervisorView,
      props: true,
    },
    {
      path: "/admin/addSupervisor/",
      name: "addSupervisor",
      component: SupervisorAdd,
    },

    //Tutor
    {
      path: "/tutors",
      name: "tutors",
      component: TutorList,
    },
    {
      path: "/tutors-edit/:id",
      name: "editTutor",
      component: TutorEdit,
      props: true,
    },
    {
      path: "/tutors/:id",
      name: "viewTutor",
      component: TutorView,
      props: true,
    },
    {
      path: "/addTutor/",
      name: "addTutor",
      component: TutorAdd,
    },
    //Student
    {
      path: "/students-edit/:id",
      name: "editStudent",
      component: StudentEdit,
      props: true,
    },
    {
      path: "/student/sessionsCalender",
      name: "sessionsCalender",
      component: SessionsCalender

    },
    {
      path: "/session/GiveFeedback/:id",
      name: "giveFeedback",
      component: StudentFeedback,
      props: true,
    },
    {
      path: "/tutors/:id",
      name: "viewTutor",
      component: TutorView,
      props: true,
    },
    {
      path: "/addStudent/",
      name: "addStudent",
      component: StudentAdd,
    },
    {
      path: "/students/:id",
      name: "viewStudent",
      component: StudentView,
      props: true,
    },

    {
      path: "/SelectOrg",
      name: "selectOrg",
      component: SelectOrg,
      props: true,
    },

    //Mentees
    {
      path: "/mentees",
      name: "mentees",
      component: Mentees,
    },
    {

      path: "/addMentee",
      name: "addMentee",
      component: MenteeAdd,
    },
    {
      path: "/Mentees/:id",
      name: "viewMentee",
      component: MenteeView,
      props: true,
    },

    {
      path: "/Mentee-Edit/:id",
      name: "editMentee",
      component: MenteeEdit,
      props: true,
    },
    //Locations
    {
      path: "/locations",
      name: "locations",
      component: Locations,
    },
    {

      path: "/addLocation",
      name: "addLocation",
      component: LocationAdd,
    },
    {
      path: "/Locations/:id",
      name: "viewLocation",
      component: LocationView,
      props: true,
    },

    {
      path: "/Location-Edit/:id",
      name: "editLocation",
      component: LocationEdit,
      props: true,
    },
////////////////
//Subjects
{
  path: "/subjects",
  name: "subjects",
  component: Subjects,
},
{

  path: "/addSubject",
  name: "addSubject",
  component: SubjectAdd,
},
{
  path: "/Subjects/:id",
  name: "viewSubject",
  component: SubjectView,
  props: true,
},

{
  path: "/Subject-Edit/:id",
  name: "editSubject",
  component: SubjectEdit,
  props: true,
},
////////////////
    {
      path: "/supervisor/sessions", //what is this? is there a difference for the sessions?
      name: "supervisorSessions",
      component: SupervisorSessionList,
    },
    {
      path: "/requests",
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
      name: "tutorrequest",
      component: Requests,
    },
    {
      path: "/tutor/sessions",

      name: "tutorSessions",
      component: SessionList,
    },
    {
      path: "/tutor/session/:id",
      name: "sessionView",
      component: SessionView,
      props: true,
    },
    {
      path: "/student/viewSessionDetails/",
      name: "studentSessionView",
      component: studentSessionView,
      props: true,
    },
    {
      path: "/userProfile//",
      name: "userprofile",
      component: userProfileView,
      props: true,
    },
    {
      path: "/user/student/becomeTutor",
      name: "becometutor",
      component: becomeTutor,
      props: true,
    },
    {
      path: "/user/tutor/sessionlist",
      name: "tutorsessionlist",
      component: tutorsessionlist,
      props: true,
    },
    {
      path: "/user/tutor/sessionlist/session/",
      name: "tutorsessiondetails",
      component: tutorsessiondetails,
      props: true,
    },
    {
      path: "/student/DropIn",
      name: "dropInTutoring",
      component: DropInTutoring,
      props: true,
    },
    {
      path: "/supervisor/DropIn",
      name: "dropInList",
      component: DropInTutorList,
      props: true,
    },
    {
      path: "/supervisor/supervisorViewSession/:id",
      name: "supervisorViewSession",
      component: supervisorViewSession,
      props: true,
    },
    {
      path: "/supervisor/supervisorViewRequest/:id",
      name: "supervisorViewRequest",
      component: RequestView,
      props: true,
    },
    

  ],
});
