import { theme } from "../theme";

export const useDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;

  if (width <= theme.deviceMaxWidths.mobile) {
    return 'mobile';
  }

  if (width <= theme.deviceMaxWidths.tablet) {
    return 'tablet';
  }

  return 'desktop';
}
