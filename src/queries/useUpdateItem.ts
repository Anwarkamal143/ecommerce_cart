import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { Key } from 'swr';
import { IAxiosRequest } from 'utils/request';
import { ApiModelDataTypes, ApiModelMapping, RequestOptions } from './apiModelMapping';
type IArgsType<T extends keyof typeof ApiModelMapping> = {
  slug: string;
  data: Partial<ApiModelDataTypes[T]>;
  options: RequestOptions & {
    requestOptions?: IAxiosRequest;
  };
};
type UpdateMutationParams<
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

export default function useUpdateItem<T extends keyof typeof ApiModelMapping>({
  queryKey,
  modelName,
  options,
}: UpdateMutationParams<T, Key, IArgsType<T>, unknown, unknown>) {
  const { model } = ApiModelMapping[modelName];

  return useSWRMutation<ApiResponse<ApiModelDataTypes[T]> | unknown, unknown, Key, IArgsType<T>>(
    queryKey,
    async (
      key: string,
      options: {
        arg: IArgsType<T>;
      },
    ) => {
      const { slug, data, options: opts } = options.arg;
      return model.update(slug, data, opts);
    },
    options,
  );
}
