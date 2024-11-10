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

  OrderScreen: 'OrderScreen',
  UpcomingOrderScreen: 'UpcomingOrderScreen',
  HistoryOrderScreen: 'HistoryOrderScreen',

  ProductsDetailScreen: 'ProductsDetailScreen',
  Logging: 'Logging',
  ProfileScreen: 'ProfileScreen',
  EditProfileScreen: 'EditProfileScreen',
  DetailCardSearch: 'DetailCardSearch',
  OTPScreen: 'OTPScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',
  SettingScreen: 'SettingScreen',
  ChangePasswordScreen: 'ChangePasswordScreen',
  PrivacyPolicyScreen: 'PrivacyPolicyScreen',
  OrderDetailsScreen: 'OrderDetailsScreen',
  DeliveryAddressScreen: 'DeliveryAddressScreen',
  RatingScreen: 'RatingScreen',
  DetailDeliveryAddressScreen: 'DetailDeliveryAddressScreen',
  HelpsAndFAQsScreen: 'HelpsAndFAQsScreen',
} as const;

export type RouteNames = keyof typeof routes;
export default routes;
