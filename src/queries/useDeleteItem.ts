import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { Key } from 'swr';
import { IAxiosRequest } from 'utils/request';
import { ApiModelDataTypes, ApiModelMapping, RequestOptions } from './apiModelMapping';
type IArgsType = {
  slug: string;
  options: RequestOptions & {
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

export default function useDeleteItem<T extends keyof typeof ApiModelMapping>({
  queryKey,
  modelName,
  options,
}: GetMutationParams<T, Key, IArgsType, unknown, unknown>) {
  const { model } = ApiModelMapping[modelName];

  return useSWRMutation<ApiResponse<ApiModelDataTypes[T]> | unknown, unknown, Key, IArgsType>(
    queryKey,
    async (
      key: string,
      options: {
        arg: IArgsType;
      },
    ) => {
      const { slug, options: opts } = options.arg;
      if (!!slug) {
        return model.delete(slug, opts);
      }
    },
    options,
  );
}
