import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { Key } from 'swr';
import { IAxiosRequest } from 'utils/request';
import { ApiModelDataTypes, ApiModelMapping, RequestOptions } from './apiModelMapping';
type IArgsType = {
  slug: string;
  options?: RequestOptions & {
    requestOptions?: IAxiosRequest;
  };
};
type GetMutationParams<
  T extends keyof typeof ApiModelMapping,
  TKey extends Key,
  TArgs = unknown,
  TError = unknown,
  TData = unknown,
> = {
  modelName: T;
  options?: SWRMutationConfiguration<TData, TError, TKey, TArgs>;
  queryKey?: TKey;
};

export default function useGetItemM<T extends keyof typeof ApiModelMapping>({
  queryKey,
  modelName,
  options,
}: GetMutationParams<T, Key, IArgsType, unknown, unknown>) {
  const { model } = ApiModelMapping[modelName];
  const newKey = typeof queryKey === 'function' ? queryKey() : queryKey;
  const newRequstId = newKey;

  return useSWRMutation<ApiResponse<ApiModelDataTypes[T]>, unknown, Key, IArgsType>(
    queryKey,
    async (
      key: string,
      options: {
        arg: IArgsType;
      },
    ) => {
      const { slug, options: opts } = options.arg;
      const reqOptions = { ...opts };
      reqOptions.requestOptions = {
        ...(reqOptions.requestOptions || {}),
        requestId: reqOptions.requestOptions?.requestId || newRequstId,
      };
      return model.get(slug, reqOptions);
    },
    options as any,
  );
}
