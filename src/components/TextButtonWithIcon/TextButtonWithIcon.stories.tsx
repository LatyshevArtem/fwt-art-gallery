import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import TextButtonWithIcon from './index';

const meta: Meta<typeof TextButtonWithIcon> = {
  title: 'components/Button',
  component: TextButtonWithIcon,
};

type Story = StoryObj<typeof TextButtonWithIcon>;

const Default: Story = {
  args: {
    children: <PlusIcon />,
    text: 'Text button',
    disabled: false,
  },
};

export { Default as TextButtonWithIcon };
export default meta;
