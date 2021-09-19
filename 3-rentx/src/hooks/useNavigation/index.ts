import { useNavigation as RNUseNavigation } from "@react-navigation/core";

export function useNavigation() {
  const { navigate: RNNavigate, goBack } = RNUseNavigation();

  function navigate(route: string, routeParams: any = {}) {
    RNNavigate(route as never, routeParams as never);
  }

  return { navigate, goBack };
}
