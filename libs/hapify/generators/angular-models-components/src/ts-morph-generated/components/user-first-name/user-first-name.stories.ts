import { Meta, Story } from "@storybook/angular";
import { UserFirstNameComponent } from "./user-first-name.component";

export default {
      title: "'Models Component/User/FirstNames'",
      component: 'UserFirstNamesComponent',
    } as Meta<UserFirstNamesComponent>;

const Template: Story<UserFirstNamesComponent> = (args: UserFirstNameComponent) => ({
      props: args,
    });
export const EmptiedFirstName = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledFirstName = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
