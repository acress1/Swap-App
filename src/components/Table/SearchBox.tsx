import React from "react";

type SearchBoxProps = {
    search: string;
    setSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, setSearch }) => {
    return (
        <div style={{ marginBottom: '2px' }}>
            <input
                name="searchBox"
                placeholder="Search"
                value={search || ''}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBox;