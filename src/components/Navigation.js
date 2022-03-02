import React from "react";
import { Link } from "react-router-dom";

export default function Navigation () {
    return(
        <>
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}