import React, { Component } from 'react';

class NewTotalAssets extends Component {
    
    render() {

        return (
            <tr><th colSpan="2">New Total Assets</th><td colSpan="10">{this.props.newTotalAssets}</td></tr>  
            )
    };
}

export default NewTotalAssets;