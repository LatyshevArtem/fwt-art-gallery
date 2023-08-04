import type { Meta, StoryObj } from '@storybook/react';
import MainPageCard from './index';

const meta: Meta<typeof MainPageCard> = {
  component: MainPageCard,
};

type Story = StoryObj<typeof MainPageCard>;

const Default: Story = {
  args: {
    name: 'Jean-Honore Fragonard',
    years: '1732 - 1806',
  },
};

export { Default };
export default meta;
