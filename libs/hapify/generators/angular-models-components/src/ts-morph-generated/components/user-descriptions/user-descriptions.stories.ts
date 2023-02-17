import { Meta, Story } from "@storybook/angular";
import { UserDescriptionComponent } from "./user-descriptions.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/Descriptions'",
      component: 'UserDescriptionsComponent',
    } as Meta<UserDescriptionsComponent>;
