import SearchBar from "./SearchBar";
import User from "./User"

import './style.scss';

export default function Profile() {
    return (
        <div className="profile">
            <User />
            <SearchBar />
        </div>
    )
}