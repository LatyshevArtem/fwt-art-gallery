import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete.svg';
import IconButton from './index';

const meta: Meta<typeof IconButton> = {
  title: 'components/Button',
  component: IconButton,
};

type Story = StoryObj<typeof IconButton>;

const Default: Story = {
  args: {
    children: <DeleteIcon />,
    disabled: false,
  },
};

export { Default as IconButton };
export default meta;
