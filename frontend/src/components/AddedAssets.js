import React, { useContext } from 'react';
import { FormControl } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

export default function AddedAssets () {

    const { addedAssets, handleAddedAssetsInput } = useContext(GlobalContext);

    return (
        <tr><th colSpan="2">Added Assets</th><td colSpan="10"><FormControl type="number" min="0" className="table input" id="addedAssetsInput" value={addedAssets} onChange={handleAddedAssetsInput} /></td></tr>
    )
};