import { css } from 'styled-components';

const variables = css`
  :root {
    --bg: #000000;
    --surface: #121212;
    --surface-elevated: #1a1a1a;
    --surface-glass: rgba(255, 255, 255, 0.05);
    --accent: #1db954;
    --accent-hover: #1ed760;
    --accent-tint: rgba(29, 185, 84, 0.12);
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --text-tertiary: #535353;
    --border: rgba(255, 255, 255, 0.08);
    --navy-shadow: rgba(0, 0, 0, 0.6);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 6px;
    --border-radius-card: 12px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
