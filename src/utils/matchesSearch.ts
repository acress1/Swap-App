
const matchesSearch = ({ dataItem, search }: {
  dataItem: any, // To debug
  search: string
}) => {

  const searchField = ["Date", "Outbound", "Inbound", "Position", "Early", "Late", "LTA", "DO", "Email", "Sent"];

  if (!search) {
    return true
  };

  if (search === "Early" || search === "early") {
    return dataItem["Early"] === true
  };

  if (search === "Late" || search === "late") {
    return dataItem["Late"] === true
  };

  return searchField.some(field =>
    dataItem[field] &&
    dataItem[field].toString().toLowerCase().includes(search.toLowerCase())
  );
};

export default matchesSearch;