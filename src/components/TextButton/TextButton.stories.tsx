import type { Meta, StoryObj } from '@storybook/react';
import TextButton from './index';

const meta: Meta<typeof TextButton> = {
  title: 'components/Button',
  component: TextButton,
};

type Story = StoryObj<typeof TextButton>;

const Default: Story = {
  args: {
    text: 'Text button',
    isDarkTheme: false,
    disabled: false,
  },
};

export { Default as TextButton };
export default meta;
