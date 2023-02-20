import { Meta, Story } from "@storybook/angular";
import { UserEmailComponent } from "./user-email.component";

export default {
      title: "'Models Component/User/Emails'",
      component: 'UserEmailsComponent',
    } as Meta<UserEmailsComponent>;

const Template: Story<UserEmailsComponent> = (args: UserEmailComponent) => ({
      props: args,
    });
export const EmptiedEmail = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledEmail = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
