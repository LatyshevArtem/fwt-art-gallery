import type { Meta, StoryObj } from '@storybook/react';
import MainPageCard from './index';

const meta: Meta<typeof MainPageCard> = {
  component: MainPageCard,
};

type Story = StoryObj<typeof MainPageCard>;

const LightTheme: Story = {
  args: {
    name: 'Jean-Honore Fragonard',
    years: '1732 - 1806',
  },
};

const DarkTheme: Story = {
  args: {
    name: 'Jean-Honore Fragonard',
    years: '1732 - 1806',
  },
};

export { LightTheme, DarkTheme };
export default meta;
