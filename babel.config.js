module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          root: ["./"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@config": "./src/config/index",
            "@contexts": "./src/contexts",
            "@lib": "./src/lib",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
