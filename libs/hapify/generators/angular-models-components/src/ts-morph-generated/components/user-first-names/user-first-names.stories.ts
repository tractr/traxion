import { Meta, Story } from "@storybook/angular";
import { UserFirstNameComponent } from "./user-first-names.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/FirstNames'",
      component: 'UserFirstNamesComponent',
    } as Meta<UserFirstNamesComponent>;
