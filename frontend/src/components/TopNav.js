import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TopNav() {
    return (
        <div className="topNav">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Rebalance" activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }}>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signIn"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }}>Sign in
                          </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }}>Register
                          </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
};


