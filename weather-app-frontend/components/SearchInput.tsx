import { useState } from "react"
import SearchIcon from "./SearchIcon"

interface SearchInputProps {
    handleSearch: Function
}

const SearchInput = ({ handleSearch }: SearchInputProps) => {

    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleKeydown = (e: any) => {
        if (e.keyCode === 13) {
            setLoading(true)
            handleSearch(search)
        }
    }

    const handleChange = (e: any) => {
        setSearch(e.target.value)
        if (e.target.value === '') {
            setLoading(false)
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search"
                className="search-input"
                onChange={(event: any) => handleChange(event)}
                onKeyDown={(event: any) => handleKeydown(event)}
            />
            {
                loading ? (
                    <div className="spinner">
                        <i className="fas fa-spinner fa-spin" color="#134601"></i>
                    </div>
                ) : (
                    <div className="search-icon" onClick={() => handleSearch(search)}>
                        <SearchIcon />
                    </div>
                )
            }
        </div>
    );
}

export default SearchInput;