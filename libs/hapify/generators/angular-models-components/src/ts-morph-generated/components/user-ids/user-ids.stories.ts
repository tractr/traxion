import { Meta, Story } from "@storybook/angular";
import { UserIdComponent } from "./user-ids.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/Ids'",
      component: 'UserIdsComponent',
    } as Meta<UserIdsComponent>;
