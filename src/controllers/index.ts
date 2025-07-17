// User Controllers
import getUser from "./user/getUser.controller.js";
import getUsers from "./user/getUsers.controller.js";
import createUser from "./user/createUser.controller.js";
import updateUser from "./user/updateUser.controller.js";
import deleteUser from "./user/deleteUser.controller.js";

// Event Controllers
import getEvent from "./event/getEvent.controller.js";
import getEvents from "./event/getEvents.controller.js";
import createEvent from "./event/createEvent.controller.js";
import updateEvent from "./event/updateEvent.controller.js";
import deleteEvent from "./event/deleteEvent.controller.js";
import upcomingEvents from "./event/upcomingEvent.controller.js";

// Registration Handlers
import register from "./register/register.controller.js";
import cancelRegistration from "./register/cancelRegistration.controller.js";

export {
  // User
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,

  // Event
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  upcomingEvents,

  // Registration
  register,
  cancelRegistration,
};
