import type { Preview } from '@storybook/react';
import '../src/components/App/scss/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        Mobile: {
          name: 'Mobile 320px',
          styles: {
            width: '320px',
            height: '100%',
          }
        },
        Tablet: {
          name: 'Tablet 768px',
          styles: {
            width: '768px',
            height: '100%',
          }
        },
        Desktop: {
          name: 'Desktop 1440px',
          styles: {
            width: '1440px',
            height: '100%',
          }
        },
      },
    },
  },
};

export default preview;
