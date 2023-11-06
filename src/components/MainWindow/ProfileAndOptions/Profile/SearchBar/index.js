import Search from "./Search";
import './style.scss';

import chat from '../../../../../assets/chat.svg'
import search from '../../../../../assets/magnifying-glass.svg'

export default function SearchBar() {
    return (
        <div className="search-container">
            <Search imgSrcs={{search: search, phone:chat}}/>
        </div>
    )
}