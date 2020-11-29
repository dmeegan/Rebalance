import React, { useContext } from 'react';
import Stock from './Stock';
import { Table } from 'react-bootstrap';
import CurrentTotalAssets from './CurrentTotalAssets';
import AddedAssets from './AddedAssets';
import NewTotalAssets from './NewTotalAssets';
import { GlobalContext } from '../context/GlobalState';


export default function Portfolio() {

    const { portfolio } = useContext(GlobalContext);

    if (portfolio.length > 0) {
        return (
            <div className="portfolioTableContainer">
                <Table striped bordered hover variant="dark">
                    <thead><tr><th scope="col"></th><th scope="col">Symbol</th><th scope="col">Stock Name</th><th scope="col">Quantity</th><th scope="col">Current Price</th><th scope="col">Market Value</th><th scope="col">Current Percentage</th><th scope="col">Target Percentage</th><th scope="col">Target Value</th><th scope="col">Added Value</th><th scope="col">Sell or Purchase</th><th scope="col">Cost or Value</th></tr></thead>
                    <tbody>
                        {
                            portfolio.map((stock) => (
                                <Stock
                                    key={stock.id}
                                    stock={stock}
                                />
                            ))}
                        <CurrentTotalAssets />
                        <AddedAssets />
                        <NewTotalAssets />
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return null;
    }
};
