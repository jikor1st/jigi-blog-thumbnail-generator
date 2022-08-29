import { lazy } from 'react';

export const namedLazy = <T extends {}, U extends keyof T>(
  loader: (x?: string) => Promise<T>,
  timeout: number | undefined = 0,
) => {
  return new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol, receiver) => {
      if (typeof componentName === 'string') {
        return lazy(() =>
          loader(componentName).then(async x => {
            const componentObject = {
              default: x[componentName as U] as any as React.ComponentType<any>,
            };
            if (timeout) {
              return await new Promise<{ default: React.ComponentType }>(
                (res, rej) => {
                  setTimeout(() => res(componentObject), timeout);
                },
              );
            } else {
              return componentObject;
            }
          }),
        );
      }
    },
  });
};
