
const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [""],
      alias: {
        '@api': './src/actions/Api',
        '@apiLocation': './src/actions/ApiLocation',
        '@assets': './src/assets',
        '@common': './src/common',
        '@components': './src/components',
        '@constants': './src/constants',
        '@context': './src/context',
        '@navigators': './src/navigators',
        '@screens': './src/screens',
        '@store': './src/redux/store',
        '@utils': './src/utils',
        '@resolutions': './src/utils/resolutions',
        '@views': './src/views',
        '@svg': './src/assets/svg',
        '@routes': './src/navigators/routes',
        '@reducers': './src/redux/reducers',
        '@images': './src/assets/images'
      }
    }

  ]
];
