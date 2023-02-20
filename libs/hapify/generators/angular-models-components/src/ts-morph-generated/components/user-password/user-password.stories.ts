import { Meta, Story } from "@storybook/angular";
import { UserPasswordComponent } from "./user-password.component";

export default {
      title: "'Models Component/User/Passwords'",
      component: 'UserPasswordsComponent',
    } as Meta<UserPasswordsComponent>;

const Template: Story<UserPasswordsComponent> = (args: UserPasswordComponent) => ({
      props: args,
    });
export const EmptiedPassword = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledPassword = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
