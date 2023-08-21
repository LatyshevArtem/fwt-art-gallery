import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import TextButton from './index';

const meta: Meta<typeof TextButton> = {
  title: 'components/Button',
  component: TextButton,
};

type Story = StoryObj<typeof TextButton>;

const Default: Story = {
  args: {
    isUnderlined: false,
    disabled: false,
  },
};

const TextButtonWithIcon: Story = {
  args: {
    children: <PlusIcon />,
    disabled: false,
  },
};

export { Default, TextButtonWithIcon };
export default meta;
