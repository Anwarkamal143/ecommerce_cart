import useSwr, { Key, SWRConfiguration } from 'swr';

import { useRef } from 'react';
import { IAxiosRequest } from 'utils/request';
import { ApiModelDataTypes, ApiModelMapping, RequestOptions } from './apiModelMapping';

type GetQueryParams<T extends keyof typeof ApiModelMapping, TKey extends Key> = {
  modelName: T;
  options?: SWRConfiguration;
  requestOptions?: RequestOptions & {
    requestOptions?: IAxiosRequest;
  };
  queryKey?: TKey;
  slug: string;
  cachePolicy?: 'no-cache' | 'cache';
  requestId?: string;
};

export default function useGetItem<T extends keyof typeof ApiModelMapping>({
  modelName,
  options,
  requestOptions: rqOptions,
  slug,
  queryKey: key,
  cachePolicy = 'no-cache',
  requestId,
}: GetQueryParams<T, Key>) {
  const { model } = ApiModelMapping[modelName];
  // const { cache } = useSWRConfig();
  // const key = `${queryKey}_${slug}`;
  const newKey = typeof key === 'function' ? key() : key;
  let newRequstId = requestId;

  if (!!newRequstId) {
    newRequstId = newKey;
  }
  const random = useRef(new Date());

  const swr = useSwr<ApiResponse<ApiModelDataTypes[T]> | undefined>(
    () => {
      const shouldAvoidCache = cachePolicy === 'no-cache';
      if (!shouldAvoidCache) {
        return newKey;
      }
      let finalKey = key;
      if (typeof key === 'function') finalKey = key();
      if (!Array.isArray(finalKey)) finalKey = [finalKey];

      return [...(finalKey as any), random];
    },
    async () => {
      if (!!slug) {
        return model.get(slug as string, {
          ...rqOptions,
          requestOptions: {
            ...rqOptions?.requestOptions,
            requestId: rqOptions?.requestOptions?.requestId || newRequstId,
          },
        });
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      shouldRetryOnError: false,
      dedupingInterval: 3000,
      ...options,
    },
  );
  // const swr = useSwr(
  //   key,
  //   async () => {
  //     if (!!slug) {
  //       return await model.get(slug as string, requestOptions);
  //     }
  //   },
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount: true,
  //     shouldRetryOnError: false,
  //     ...options,
  //   },
  // );
  // useLayoutEffect(() => {
  //   if (removecacheonUnmount) {
  //     cache.delete(key);
  //   }
  // }, [slug]);
  return swr;
}
