export const serialiseParamsUtil = (params: Record<string, unknown>) =>
  Object.keys(params).reduce((acc, curr, i) => {
    return `${acc}${i > 0 ? '&' : ''}${curr}=${params[curr]}`;
  }, '');
