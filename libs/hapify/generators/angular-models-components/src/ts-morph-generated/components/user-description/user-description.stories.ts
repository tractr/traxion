import { Meta, Story } from "@storybook/angular";
import { UserDescriptionComponent } from "./user-description.component";

export default {
      title: "'Models Component/User/Descriptions'",
      component: 'UserDescriptionsComponent',
    } as Meta<UserDescriptionsComponent>;

const Template: Story<UserDescriptionsComponent> = (args: UserDescriptionComponent) => ({
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
