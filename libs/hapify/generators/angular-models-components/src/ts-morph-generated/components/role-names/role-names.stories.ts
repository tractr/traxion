import { Meta, Story } from "@storybook/angular";
import { RoleNameComponent } from "./role-names.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/Role/Names'",
      component: 'RoleNamesComponent',
    } as Meta<RoleNamesComponent>;
