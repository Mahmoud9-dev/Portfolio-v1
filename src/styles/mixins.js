import { css } from 'styled-components';

const button = css`
  color: var(--bg);
  background-color: var(--accent);
  border: none;
  border-radius: 500px;
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
  text-decoration: none;
  padding: 1.25rem 1.75rem;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    background-color: var(--accent-hover);
    transform: scale(1.04);
    box-shadow: none;
    color: var(--bg);
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--accent);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--accent);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--accent);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--accent) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  smallButton: css`
    color: var(--bg);
    background-color: var(--accent);
    border: none;
    border-radius: 500px;
    padding: 0.75rem 1rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--accent-hover);
      transform: scale(1.04);
      box-shadow: none;
      color: var(--bg);
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--bg);
    background-color: var(--accent);
    border: none;
    border-radius: 500px;
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--accent-hover);
      transform: scale(1.04);
      box-shadow: none;
      color: var(--bg);
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '\u25B9';
        position: absolute;
        left: 0;
        color: var(--accent);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
