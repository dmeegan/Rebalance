import React, { Component } from 'react';
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';

class AddStock extends Component {
    state = {
        userSymbolInput: '',
    }


    handleUserInput = (e) => {
        this.setState({
            userSymbolInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addStock(this.state.userSymbolInput.replace(" ", ""));
        this.setState({ userSymbolInput: '' })
    };

    render() {
        return (
            <Form className="addStockForm" onSubmit={this.handleSubmit}>
            <InputGroup>
                <InputGroup.Prepend>
                    <Button variant="outline-secondary" type="submit">Add Stock</Button>
                </InputGroup.Prepend>
                <FormControl placeholder="AMZN..." required onSubmit={this.handleSubmit} type="text" value={this.state.userSymbolInput} onChange={this.handleUserInput}/>
            </InputGroup>
            </Form>
        )
    };
}

export default AddStock;