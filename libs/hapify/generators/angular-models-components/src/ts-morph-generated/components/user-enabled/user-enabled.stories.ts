import { Meta, Story } from "@storybook/angular";
import { UserEnabledComponent } from "./user-enabled.component";

export default {
      title: "'Models Component/User/Enableds'",
      component: 'UserEnabledsComponent',
    } as Meta<UserEnabledsComponent>;

const Template: Story<UserEnabledsComponent> = (args: UserEnabledComponent) => ({
      props: args,
    });
export const EmptiedEnabled = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledEnabled = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
