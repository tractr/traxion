import { Meta, Story } from "@storybook/angular";
import { UserCreditsComponent } from "./user-credits.component";

export default {
      title: "'Models Component/User/Credits'",
      component: 'UserCreditsComponent',
    } as Meta<UserCreditsComponent>;

const Template: Story<UserCreditsComponent> = (args: UserCreditsComponent) => ({
      props: args,
    });
export const EmptiedCredits = Template.bind({
              args: {
                placeholder: ""
              }
            });
export const FilledCredits = Template.bind({
              args: {
                placeholder: "not empty"
              }
            });
