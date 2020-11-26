import React, { useState } from 'react';
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default function AddStock() {

    const [userSymbolInput, setUserSymbolInput] = useState('');

    const handleUserInput = (e) => {
        setUserSymbolInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addStock(userSymbolInput.replace(" ", ""));
        setUserSymbolInput('');
    };

    const addStock = (userSymbolInput) => {
        let currentPortfolioLength = this.state.portfolio.length;
        
        let request = {
            user_symbol_input : userSymbolInput,
            current_portfolio_length : currentPortfolioLength
        }
        axios.post('http://localhost:3000/addStock', request)
        .then( response => {
            setState({ portfolio: [...state.portfolio, response] });
        })
        .catch( err => {
            console.log(err)
        })
      }

    return (
        <div className="addStockFormContainer">
        <Form className="customForm" onSubmit={handleSubmit}>
        <InputGroup>
            <InputGroup.Prepend>
                <Button variant="outline-primary" type="submit">Add Stock</Button>
            </InputGroup.Prepend>
            <FormControl placeholder="AMZN..." required onSubmit={handleSubmit} type="text" value={userSymbolInput} onChange={handleUserInput}/>
        </InputGroup>
        </Form>
        </div>
    )
}