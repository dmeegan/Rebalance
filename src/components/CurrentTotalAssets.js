import React, { Component } from 'react';

class CurrentTotalAssets extends Component {
    
    render() {
        return (
            <tfoot><tr><th colSpan="2">Current Total Assets</th><td colSpan="10">{this.props.currentTotalAssets}</td></tr></tfoot>  
            )
    };
}

export default CurrentTotalAssets;