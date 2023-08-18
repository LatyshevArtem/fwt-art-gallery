import type { Meta, StoryObj } from '@storybook/react';
import PaintingCard from './index';

const meta: Meta<typeof PaintingCard> = {
  component: PaintingCard,
};

type Story = StoryObj<typeof PaintingCard>;

const Default: Story = {
  args: {
    name: 'Jean-Honore Fragonard',
    years: '1732 - 1806',
  },
};

export { Default };
export default meta;
