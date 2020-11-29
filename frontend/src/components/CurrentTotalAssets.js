import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function CurrentTotalAssets() {

        const { currentTotalAssets } = useContext(GlobalContext);

        return (
                <tr><th colSpan="2">Current Total Assets</th><td colSpan="10">{currentTotalAssets}</td></tr>
        );
};