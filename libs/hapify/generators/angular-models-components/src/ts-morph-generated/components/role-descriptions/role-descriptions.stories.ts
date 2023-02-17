import { Meta, Story } from "@storybook/angular";
import { RoleDescriptionComponent } from "./role-descriptions.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/Role/Descriptions'",
      component: 'RoleDescriptionsComponent',
    } as Meta<RoleDescriptionsComponent>;
