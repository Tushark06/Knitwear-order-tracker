import { useState, useEffect } from 'react';
import { callApi } from './api';

export default function Board() {
    const [orders, setOrders] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState('');

    async function loadData() {
        try {
            const o = await callApi('/orders');
            setOrders(o);
            const a = await callApi('/alerts');
            setAlerts(a);
        } catch (err) {
            setError(err.message);
        }
    }

    async function doAction(id, action) {
        try {
            await callApi('/alerts/' + id + '/' + action, 'PATCH');
             loadData();
        }  catch (err) { setError(err.message); }
    }

    useEffect(() => { loadData(); }, []);

    return (
        <div>
            <h1>Order Board</h1>
            {error && <p>{error}</p>}
            {orders.map((order) => (
                <div key={order._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                    <h3>{order.poNumber} — {order.styleName}</h3>
                    <p>Buyer: {order.buyer.name} ({order.buyer.country}) | Stage: {order.currentStage}</p>
                    <p>Ex-factory: {order.exFactoryDate.slice(0, 10)}</p>
                    slice(0, 10)
                   <p>Done: {order.runRate.done} / {order.totalQuantity} | Bache: {order.runRate.remainingQuantity} | Din bache: {order.runRate.daysLeft}</p>
                   <p>Chahiye: {order.runRate.requiredPerDay}/day | Ban raha: {order.runRate.actualPerDay}/day</p>
                   <p>Status: <span style={{ backgroundColor: order.runRate.status === 'Green' ? 'green' : order.runRate.status === 'Amber' ? 'orange' : 'red', padding: '2px 8px', color: 'white' }}>{order.runRate.status}</span></p>
                </div>
            ))}
            <h2>Delay Alerts</h2>
            {alerts.map((alert) => (
                <div key={alert._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                    <p>{alert.order.poNumber} — {alert.level}</p>
                    <p>{alert.message}</p>
                    <p>Status: {alert.status}</p>
                    {alert.status === 'Open' && <button onClick={() => doAction(alert._id, 'confirm')}>Confirm</button>}
                    {alert.status === 'Confirmed' && <button onClick={() => doAction(alert._id, 'send')}>Send to buyer</button>}
        </div>
        ))}
    );

}
            
