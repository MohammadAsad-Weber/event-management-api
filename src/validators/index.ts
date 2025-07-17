// User Schemas & Types
import {
  CreateUserSchema,
  type CreateUserType,
} from "./user/createUser.schema.js";
import {
  UpdateUserSchema,
  type UpdateUserType,
} from "./user/updateUser.schema.js";

// Event Schemas & Types
import {
  CreateEventSchema,
  type CreateEventType,
} from "./event/createEvent.schema.js";
import {
  UpdateEventSchema,
  type UpdateEventType,
} from "./event/updateEvent.js";

// Registration Schemas & Tpyes
import {
  RegisterSchema,
  type RegisterType,
} from "./register/register.schema.js";
import {
  CancelRegistrationSchema,
  type CancelRegistrationType,
} from "./register/cancelRegistration.schema.js";

export {
  CreateEventSchema,
  CreateEventType,
  UpdateUserSchema,
  UpdateUserType,
  CreateUserSchema,
  CreateUserType,
  UpdateEventSchema,
  UpdateEventType,
  RegisterSchema,
  RegisterType,
  CancelRegistrationSchema,
  CancelRegistrationType,
};
