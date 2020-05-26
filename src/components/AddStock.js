import React, {Component} from 'react';

class AddStock extends Component {
    state = {
        userSymbolInput:'',
      }


    handleUserInput = (e) => {
        this.setState({
            userSymbolInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addStock(this.state.userSymbolInput);
        this.setState({userSymbolInput: ''})
    };

    render() {
        return (
            <form className="addStockForm" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleUserInput} value={this.state.userSymbolInput}/>
            <button type="submit">Add Stock</button>
            </form>
        )
};
}

export default AddStock;