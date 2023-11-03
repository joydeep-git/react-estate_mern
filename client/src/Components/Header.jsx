import React from 'react';

import { BiSearchAlt2 } from "react-icons/bi";

const Header = () => {
    return (
        <div>

            <h1>React-Estate</h1>

            <div>
                <input type="text" placeholder='Search Property....' />
                <BiSearchAlt2 />
            </div>

            <div></div>

        </div>
    )
}

export default Header;