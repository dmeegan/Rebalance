import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function NewTotalAssets() {

    const { newTotalAssets } = useContext(GlobalContext);

    return (
        <tr><th colSpan="2">New Total Assets</th><td colSpan="10">{newTotalAssets}</td></tr>
    )
}