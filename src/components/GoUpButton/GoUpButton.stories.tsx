import type { Meta, StoryObj } from '@storybook/react';
import GoUpButton from './index';

const meta: Meta<typeof GoUpButton> = {
  title: 'components/Button',
  component: GoUpButton,
};

type Story = StoryObj<typeof GoUpButton>;

const Default: Story = {
  args: {
    disabled: false,
  },
};

export { Default as GoUpButton };
export default meta;
