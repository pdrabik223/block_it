// Allow importing SVG files as URLs (strings) in TypeScript
// Usage: import logoUrl from '../assets/react.svg';
// Then: <img src={logoUrl} alt="logo" />

declare module '*.svg' {
  const content: string;
  export default content;
}
