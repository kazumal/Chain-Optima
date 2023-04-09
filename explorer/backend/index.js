const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

const tendermintRpcUrl = 'http://0.0.0.0:26657';
const cosmosRestApiUrl = 'http://0.0.0.0:1317';

async function getBlock(height) {
  const response = await axios.get(`${tendermintRpcUrl}/block?height=${height}`);
  return response.data.result;
}

async function getTransaction(txHash) {
  try {
    const response = await axios.get(`${tendermintRpcUrl}/tx_search?query="tx.hash='${txHash}'"`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}

app.get('/block/:height', async (req, res) => {
  const block = await getBlock(req.params.height);
  res.json(block);
});

app.get('/transaction/:txHash', async (req, res) => {
  const transaction = await getTransaction(req.params.txHash);
  res.json(transaction);
});

app.listen(port, () => {
  console.log(`Explorer backend listening at http://localhost:${port}`);
});
