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
    text: 'Text button',
    isFilled: true,
    disabled: false,
  },
};

const TextButtonWithIcon: Story = {
  args: {
    children: <PlusIcon />,
    text: 'With icon',
    disabled: false,
  },
};

export { Default, TextButtonWithIcon };
export default meta;
