import { Meta, Story } from "@storybook/angular";
import { RoleNameComponent } from "./role-name.component";

export default {
      title: "'Models Component/Role/Names'",
      component: 'RoleNamesComponent',
    } as Meta<RoleNamesComponent>;

const Template: Story<RoleNamesComponent> = (args: RoleNameComponent) => ({
      props: args,
    });
export const EmptiedName = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledName = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
