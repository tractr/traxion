import { Meta, Story } from "@storybook/angular";
import { RoleDescriptionComponent } from "./role-description.component";

export default {
      title: "'Models Component/Role/Descriptions'",
      component: 'RoleDescriptionsComponent',
    } as Meta<RoleDescriptionsComponent>;

const Template: Story<RoleDescriptionsComponent> = (args: RoleDescriptionComponent) => ({
      props: args,
    });
export const EmptiedDescription = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledDescription = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
