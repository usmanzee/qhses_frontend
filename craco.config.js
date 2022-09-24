const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@disable-color": "#7b7b7b",
              "@btn-disable-color": "#7b7b7b",
              "@input-disabled-color": "#7b7b7b",
              "@select-multiple-item-disabled-color": "#7b7b7b",
              "@radio-dot-disabled-color": "#7b7b7b",
              "@radio-disabled-button-checked-bg": "#7b7b7b",
              "@radio-disabled-button-checked-color": "#7b7b7b",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
