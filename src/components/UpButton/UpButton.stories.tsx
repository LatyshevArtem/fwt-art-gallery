import type { Meta, StoryObj } from '@storybook/react';
import UpButton from './index';

const meta: Meta<typeof UpButton> = {
  title: 'components/Button',
  component: UpButton,
};

type Story = StoryObj<typeof UpButton>;

const Default: Story = {
  args: {},
};

export { Default as UpButton };
export default meta;
