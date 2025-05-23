const routes = {
  MainNavigator: 'MainNavigator',
  AuthNavigator: 'AuthNavigator',
  RoutesNavigator: 'RoutesNavigator',
  BottomTabNavigator: 'BottomTabNavigator',

  NotFoundScreen: 'NotFoundScreen',

  // Auth Nav
  SplashScreen: 'SplashScreen',
  CarouselScreen: 'CarouselScreen',
  WelcomeScreen: 'WelcomeScreen',
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',

  HomeScreen: 'HomeScreen',
  SearchScreen: 'SearchScreen',
  CartScreen: 'CartScreen',
  FavoriteScreen: 'FavoriteScreen',
  NotificationScreen: 'NotificationScreen',

  ProductsDetailScreen: 'ProductsDetailScreen',
  DetailCardSearch: 'DetailCardSearch',
  OrderScreen: 'OrderScreen',
  UpcomingOrderScreen: 'UpcomingOrderScreen',
  HistoryOrderScreen: 'HistoryOrderScreen',
  OrderDetailsScreen: 'OrderDetailsScreen',
  ProfileScreen: 'ProfileScreen',
  EditProfileScreen: 'EditProfileScreen',
  DeliveryAddressScreen: 'DeliveryAddressScreen',
  CreateDeliveryAddressScreen: 'CreateDeliveryAddressScreen',
  DetailDeliveryAddressScreen: 'DetailDeliveryAddressScreen',

  Logging: 'Logging',
  OTPScreen: 'OTPScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',
  SettingScreen: 'SettingScreen',
  ChangePasswordScreen: 'ChangePasswordScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
  RatingScreen: 'RatingScreen',
  HelpsAndFAQsScreen: 'HelpsAndFAQsScreen',
} as const;

export type RouteNames = keyof typeof routes;
export default routes;
