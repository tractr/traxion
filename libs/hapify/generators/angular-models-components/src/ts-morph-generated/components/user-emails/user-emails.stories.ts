import { Meta, Story } from "@storybook/angular";
import { UserEmailComponent } from "./user-emails.component";

const EmptyRoles = Template.bind({}), args = { placeholder: "" };
const EmptyRoles = Template.bind({}), args = { placeholder: "not empty" };

export default {
      title: "'Models Component/User/Emails'",
      component: 'UserEmailsComponent',
    } as Meta<UserEmailsComponent>;
