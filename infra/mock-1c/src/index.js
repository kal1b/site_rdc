import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.post('/odata/invoices', (req, res) => res.json({ id: 'INV-TEST-001', received: req.body }));
app.post('/odata/payments', (req, res) => res.json({ id: 'PAY-TEST-001', received: req.body }));

const port = 3100;
app.listen(port, '0.0.0.0', () => console.log(`mock-1c on ${port}`));
