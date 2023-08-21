import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as LogoIcon } from '@assets/icons/logo.svg';
import Link from './index';

const meta: Meta<typeof Link> = {
  component: Link,
};

type Story = StoryObj<typeof Link>;

const Default: Story = {
  args: {
    children: 'Link',
  },
};

const IconLink: Story = {
  args: {
    children: <LogoIcon />,
  },
};

export { Default, IconLink };
export default meta;
