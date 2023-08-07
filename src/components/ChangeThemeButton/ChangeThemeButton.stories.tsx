import type { Meta, StoryObj } from '@storybook/react';
import ChangeThemeButton from './index';

const meta: Meta<typeof ChangeThemeButton> = {
  title: 'components/Button',
  component: ChangeThemeButton,
};

type Story = StoryObj<typeof ChangeThemeButton>;

const Default: Story = {
  args: {
    disabled: false,
  },
};

export { Default as ChangeThemeButton };
export default meta;
