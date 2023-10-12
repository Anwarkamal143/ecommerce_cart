import Product from "components/product";
import Select from "components/select";
import { HOME_FILTER_OPTIONS } from "data";
import { ApiModels } from "queries/apiModelMapping";
import useListItems from "queries/useListItems";
import { useState } from "react";

type Props = {};
const Home = (props: Props) => {
  const [query, setQuery] = useState<any>({});

  const { error, data, isLoading } = useListItems({
    queryKey: query ? JSON.stringify(query) : "get_items",
    modelName: ApiModels.Products,
    requestId: "get_items",
    queryOptions: {
      query,
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    <p>{error?.message || "Error in fetching products..."}</p>;
  }

  const onHandleSelect = (e: string) => {
    setQuery(!!e ? { colour: e } : {});
  };
  return (
    <div>
      <div className="w-full md:w-40">
        <Select
          value={query.colour}
          onChange={(e) => {
            onHandleSelect(e.target.value);
          }}
          options={HOME_FILTER_OPTIONS}
        />
      </div>
      <div className="space-y-4 flex flex-wrap">
        {data?.data.map((p) => {
          return <Product key={p.id} product={p} />;
        })}
      </div>
    </div>
  );
};

export default Home;
