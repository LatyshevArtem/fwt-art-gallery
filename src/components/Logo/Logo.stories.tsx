import type { Meta, StoryObj } from '@storybook/react';
import Logo from './index';

const meta: Meta<typeof Logo> = {
  component: Logo,
};

type Story = StoryObj<typeof Logo>;

const Default: Story = {
  args: {},
};

export { Default };
export default meta;
