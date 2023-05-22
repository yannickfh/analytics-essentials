const NODE_ENV_DEVELOPMENT = 'development';

const isAvailable = (): boolean => {
  // check for SSR
  if (typeof window === 'undefined') {
    return false;
  }

  const gtag = window.gtag;
  if (!gtag) {
    if (process.env.NODE_ENV === NODE_ENV_DEVELOPMENT) {
      console.warn(
        'It looks like GTAG is not (properly) installed... https://support.google.com/analytics/answer/9304153?hl=en#zippy=%2Cweb%2Cadd-the-google-tag-directly-to-your-web-pages'
      );
    }
    return false;
  }

  return true; // gtag available
};

export enum EventTypes {
  CLICK = 'click',
}

export const pushTrackingEvent = (type: EventTypes | string, context?: {}) => {
  if (!isAvailable()) return;
  const gtag = window.gtag;

  gtag('event', type, context);
};
