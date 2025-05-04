import { LinkingOptions } from "@react-navigation/native";

interface RootParamList {

}

const config: LinkingOptions<RootParamList>['config'] = {
  screens: {}
}

const linking: LinkingOptions<RootParamList> = {
  prefixes: [
    "fastfood://app"
  ],
  config,
};

export default linking;