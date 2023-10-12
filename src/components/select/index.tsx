import { ComponentPropsWithoutRef, ReactNode } from "react";
type IOption = {
  label: ReactNode;
  value: string | number;
};
type ISelectProps = ComponentPropsWithoutRef<"select"> & {
  options: IOption[];
  selected?: IOption;
};

const Select = (props: ISelectProps) => {
  const { options, selected, ...rest } = props;

  return (
    <div className="w-full">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Select an option
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      >
        {!selected ? (
          <option value={""} key={"defaultv"}>
            All
          </option>
        ) : null}
        {options.map((op) => {
          return (
            <option value={op.value} key={op.value}>
              {op.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
