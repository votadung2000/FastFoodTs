const routes = {
  MainNavigator: 'MainNavigator',
  AuthNavigator: 'AuthNavigator',
  RoutesNavigator: 'RoutesNavigator',
  BottomTabNavigator: 'BottomTabNavigator',

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

  Logging: 'Logging',
  OTPScreen: 'OTPScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',
  SettingScreen: 'SettingScreen',
  ChangePasswordScreen: 'ChangePasswordScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
  DeliveryAddressScreen: 'DeliveryAddressScreen',
  RatingScreen: 'RatingScreen',
  DetailDeliveryAddressScreen: 'DetailDeliveryAddressScreen',
  HelpsAndFAQsScreen: 'HelpsAndFAQsScreen',
} as const;

export type RouteNames = keyof typeof routes;
export default routes;
