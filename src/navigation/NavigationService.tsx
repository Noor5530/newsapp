import { CommonActions } from "@react-navigation/native";

let _navigator:any;

function setTopLevelNavigator(navigatorRef:any) {
  _navigator = navigatorRef;
}

function navigate(routeName:string, params:any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params
    })
  );
}

function goBack(key:string) {
  _navigator.dispatch(
    CommonActions.back({
      key: key
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator
};
