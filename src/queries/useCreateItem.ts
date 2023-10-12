import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useRef } from 'react';
import { Key } from 'swr';
import { IAxiosRequest } from 'utils/request';
import { ApiModelDataTypes, ApiModelMapping, RequestOptions } from './apiModelMapping';
type IArgsType<T extends keyof typeof ApiModelMapping> = {
  data: Partial<ApiModelDataTypes[T]>;
  options?: RequestOptions & {
    requestOptions?: IAxiosRequest;
  };
};
type CreateMutationParams<
  T extends keyof typeof ApiModelMapping,
  TKey extends Key,
  TArgs = unknown,
  TError = unknown,
  TData = unknown,
> = {
  modelName: T;
  options?: SWRMutationConfiguration<TData, TError, TKey, TArgs>;
  queryKey?: TKey;
  cachePolicy?: 'no-cache' | 'cache';
};

export default function useCreateItem<T extends keyof typeof ApiModelMapping>({
  queryKey: key,
  modelName,
  options,
  cachePolicy = 'cache',
}: CreateMutationParams<T, Key, IArgsType<T>, unknown, unknown>) {
  const { model } = ApiModelMapping[modelName];
  const newKey = typeof key === 'function' ? key() : key;

  const random = useRef(new Date());

  return useSWRMutation<ApiResponse<ApiModelDataTypes[T]> | unknown, unknown, Key, IArgsType<T>>(
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
    async (
      key: string,
      options: {
        arg: IArgsType<T>;
      },
    ) => {
      const { data, options: opts } = options.arg;

      return model.create(data, opts);
    },
    options,
  );
}
