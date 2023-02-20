import { Meta, Story } from "@storybook/angular";
import { UserLastNameComponent } from "./user-last-name.component";

export default {
      title: "'Models Component/User/LastNames'",
      component: 'UserLastNamesComponent',
    } as Meta<UserLastNamesComponent>;

const Template: Story<UserLastNamesComponent> = (args: UserLastNameComponent) => ({
      props: args,
    });
export const EmptiedLastName = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledLastName = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
