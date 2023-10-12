import useSwr, { Key, SWRConfiguration } from "swr";

import { useRef } from "react";
import { IAxiosRequest } from "utils/request";
import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type GetQueryParams<
  T extends keyof typeof ApiModelMapping,
  TKey extends Key
> = {
  modelName: T;
  options?: SWRConfiguration;
  queryOptions?: RequestOptions & {
    requestOptions?: IAxiosRequest;
  };
  queryKey: TKey;
  requestId?: string;
  cachePolicy?: "no-cache" | "cache";
};

export default function useListItems<T extends keyof typeof ApiModelMapping>({
  modelName,
  options,
  queryOptions,
  queryKey: key,
  requestId,
  cachePolicy = "no-cache",
}: GetQueryParams<T, Key>) {
  const { model } = ApiModelMapping[modelName];
  const newKey = typeof key === "function" ? key() : key;
  let newRequstId = requestId;
  const random = useRef(new Date());
  if (!!newRequstId) {
    newRequstId = newKey;
  }

  const swr = useSwr<ApiResponse<ApiModelDataTypes[T][]>>(
    () => {
      const shouldAvoidCache = cachePolicy === "no-cache";
      if (!shouldAvoidCache) {
        return newKey;
      }
      let finalKey = key;
      if (typeof key === "function") finalKey = key();
      if (!Array.isArray(finalKey)) finalKey = [finalKey];

      return [...(finalKey as any), random];
    },
    async () => {
      return model.list({
        ...queryOptions,
        requestOptions: {
          ...queryOptions?.requestOptions,
          requestId: newRequstId,
        },
      });
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      shouldRetryOnError: false,
      dedupingInterval: 3000,
      ...options,
    }
  );
  // const swr = useSwr(
  //   queryKey,
  //   async () => {
  //     return await model.list(queryOptions);
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
  //     cache.delete(queryKey as string);
  //   }
  // }, [queryKey]);
  return swr;
}
