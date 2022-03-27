import { enumType, objectType } from "nexus";
import { User, UserRole } from "../../prisma/nexus";

export const UserRoleEnum = enumType(UserRole);

export const UserObject = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.role);
  },
});
