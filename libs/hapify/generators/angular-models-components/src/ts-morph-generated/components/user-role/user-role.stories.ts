import { Meta, Story } from "@storybook/angular";
import { UserRoleComponent } from "./user-role.component";

export default {
      title: "'Models Component/User/Roles'",
      component: 'UserRolesComponent',
    } as Meta<UserRolesComponent>;

const Template: Story<UserRolesComponent> = (args: UserRoleComponent) => ({
      props: args,
    });
export const EmptiedRole = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledRole = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
