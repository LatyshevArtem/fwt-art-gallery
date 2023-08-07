import type { Meta, StoryObj } from '@storybook/react';
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

export { Default as Link };
export default meta;
