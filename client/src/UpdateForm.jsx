import { useState, useEffect } from 'react';
import { callApi } from './api';

export default function UpdateForm({ onDone }) {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState('');
      const [stage, setStage] = useState('Stitching')
      const [quantityDone, setQuantityDone] = useState('');
      const [issueNote, setIssueNote] = useState('');
      const [reasonCategory, setReasonCategory] = useState('No issue');
      const [message, setMessage] = useState('');
      useEffect(() => { callApi('/orders').then((data) => setOrders(data)); }, []);
      
      async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        try {
            await callApi('/stage-events', 'POST', { order: orderId, stage, quantityDone: Number(quantityDone), photoUrl: '', issueNote, reasonCategory })
            setMessage('Update save ho gaya');
            onDone();
        } catch (err) {
            setMessage(err.message);
        }
      }
}