let appOptions;

export const registerAppOptions = (options) => {
  appOptions = options;
};

export const getAppOptions = () => {
  if (!appOptions) {
    throw new Error(
      "[mdx-docs] createApp() must be called before prerendering."
    );
  }

  return appOptions;
};
