import { Meta, Story } from "@storybook/angular";
import { UserLastNameComponent } from "./user-last-names.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/LastNames'",
      component: 'UserLastNamesComponent',
    } as Meta<UserLastNamesComponent>;
