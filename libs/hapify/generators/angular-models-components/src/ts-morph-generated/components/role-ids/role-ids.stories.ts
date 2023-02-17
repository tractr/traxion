import { Meta, Story } from "@storybook/angular";
import { RoleIdComponent } from "./role-ids.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/Role/Ids'",
      component: 'RoleIdsComponent',
    } as Meta<RoleIdsComponent>;
