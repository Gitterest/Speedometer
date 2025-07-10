# Speedometer

Mobile speedometer built with React, Vite and Tailwind CSS.

## 3D Speedometer

The Pro dashboard now includes an experimental 3D gauge powered by
`react-three-fiber` and `react-spring`. Toggle the **3D** button to switch
between the original SVG dial and the realtime WebGL version.

## Setup

```bash
npm install
```

This installs additional 3D rendering libraries such as
`@react-three/fiber` and `@react-spring/three`.

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.
The new `/pro` route showcases a more detailed speedometer interface.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Test

```bash
npm test
```

### Custom styles

The project defines a few global utilities:

- `bg-radial` – applies a radial gradient using Tailwind's gradient stops.
- `frosted-glass` – creates a blurred, translucent panel.

In addition, the Tailwind theme includes `neon.cyan`, `neon.magenta` and
`neon.lime` color values as well as a `digital` font family.

## License

This project is released under the [MIT](LICENSE) license.

## Mobile App

The `/mobile` folder contains a React Native version powered by Expo.

### Setup

```bash
cd mobile
npm install
```

### Development

This app uses native modules that aren't available in Expo Go. Use the Expo dev
client instead:

```bash
npx expo run:android # or `npx expo run:ios`
```

### Production build

```bash
# Android or iOS
npx eas build --platform android
npx eas build --platform ios
```
