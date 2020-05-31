import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class AddedAssets extends Component {
    
    render() {
        return (
            <tfoot><tr><th colSpan="2">Added Assets</th><td colSpan="10"><FormControl type="number" min="0" className="table input" id="addedAssetsInput" value={this.props.addedAssets} onChange={this.props.handleAddedAssetsInput.bind(this)}/></td></tr></tfoot>  
            )
    };
}

export default AddedAssets;