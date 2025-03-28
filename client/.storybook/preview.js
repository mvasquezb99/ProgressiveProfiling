/** @type { import('@storybook/react').Preview } */
const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/d1023b5858.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
