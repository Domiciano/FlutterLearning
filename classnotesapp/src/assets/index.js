// assets/index.js
const images = import.meta.glob('./*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

export default Object.fromEntries(
  Object.entries(images).map(([key, value]) => [
    key.replace('./', ''),
    value,
  ])
);