import { Meta, Story } from "@storybook/angular";
import { UserRoleComponent } from "./user-roles.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/Roles'",
      component: 'UserRolesComponent',
    } as Meta<UserRolesComponent>;
