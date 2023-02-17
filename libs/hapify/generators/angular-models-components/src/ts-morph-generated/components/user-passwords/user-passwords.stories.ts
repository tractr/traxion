import { Meta, Story } from "@storybook/angular";
import { UserPasswordComponent } from "./user-passwords.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/Passwords'",
      component: 'UserPasswordsComponent',
    } as Meta<UserPasswordsComponent>;
