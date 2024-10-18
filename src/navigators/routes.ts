const routes = {
  MainNavigator: 'MainNavigator',
  AuthNavigator: 'AuthNavigator',

  // Auth Nav
  SplashScreen: 'SplashScreen',

  BottomTabNavigator: 'BottomTabNavigator',
  RoutesNavigator: 'RoutesNavigator',
  CarouselScreen: 'CarouselScreen',
  WelcomeScreen: 'WelcomeScreen',
  HomeScreen: 'HomeScreen',
  ProductsDetailScreen: 'ProductsDetailScreen',
  HeartScreen: 'HeartScreen',
  CartScreen: 'CartScreen',
  Logging: 'Logging',
  ProfileScreen: 'ProfileScreen',
  EditProfileScreen: 'EditProfileScreen',
  SearchScreen: 'SearchScreen',
  DetailCardSearch: 'DetailCardSearch',
  LoginScreen: 'LoginScreen',
  RegisterScreen: 'RegisterScreen',
  OTPScreen: 'OTPScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',
  SettingScreen: 'SettingScreen',
  ChangePasswordScreen: 'ChangePasswordScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
  NotificationScreen: 'NotificationScreen',
  OrderScreen: 'OrderScreen',
  UpcomingOrderScreen: 'UpcomingOrderScreen',
  HistoryOrderScreen: 'HistoryOrderScreen',
  OrderDetailsScreen: 'OrderDetailsScreen',
  DeliveryAddressScreen: 'DeliveryAddressScreen',
  RatingScreen: 'RatingScreen',
  DetailDeliveryAddressScreen: 'DetailDeliveryAddressScreen',
  HelpsAndFAQsScreen: 'HelpsAndFAQsScreen',

} as const;

export type RouteNames = keyof typeof routes;
export default routes;
