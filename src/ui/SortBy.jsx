import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

SortBy.propTypes = {
  options: PropTypes.array,
};

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortValue = searchParams.get("sortBy") ?? "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} value={currentSortValue} onChange={handleChange} type="white" />;
}

export default SortBy;
