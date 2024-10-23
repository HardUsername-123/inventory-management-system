import { Link, Search } from "lucide-react";
import React from "react";

const CustomSearch = ({ searchTerm, handleSearch, filteredData }) => {
  return (
    <div className="w-72">
      <div className="flex items-center rounded-lg  bg-myBgDark-textSoft">
        <Search className="w-5 h-5 text-slate-100 ml-3" />
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 focus:outline-none rounded-lg text-white bg-myBgDark-textSoft placeholder-slate-50"
        />
      </div>

      {searchTerm && filteredData.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => filteredData}
            >
              {/* <Link href={`/details/${item._id}`}>{item.productName}</Link> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSearch;
