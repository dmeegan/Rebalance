import React, { useContext, useState } from 'react';
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

export default function AddStock() {

    const [userSymbolInput, setUserSymbolInput] = useState('');
    const { addStock, portfolio } = useContext(GlobalContext);

    const handleUserInput = (e) => {
        setUserSymbolInput(e.target.value)
    }

    const fetchStock = (symbolToFetch) => {
            const request = {
                symbolToFetch: symbolToFetch,
                currentPortfolioLength: portfolio.length,
            }
            axios.post('http://localhost:3000/addstock', request)
                .then(response => {
                    console.log(response.data);
                    addStock(response.data);
                })
                .catch(err => {
                    console.log(err)
                })
            };

    const handleSubmit = (e) => {
        e.preventDefault();
        const symbolToFetch = userSymbolInput.replace(" ", "");
        fetchStock(symbolToFetch)
        setUserSymbolInput('');
    };

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