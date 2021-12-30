/*
 * Reducer actions related with navigation
 */
import NavigationService from "../navigation/NavigationService";

export function navigateToHome(params:any) {
  NavigationService.navigate("App", params);
}
export function navigateToLogin(params:any) {
  NavigationService.navigate("Login", params);
}
