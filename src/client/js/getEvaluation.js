import evalParser from './evalParser'

export default async function getEvaluation(inputValues) {
  try {
    const key = await fetchKey();
    const resp = await fetchEval(key, inputValues.eval_url)
    return evalParser(resp);
  }
  catch (error) {
    throw error;
  }
}

async function fetchKey() {
  try {
    const key = await fetch('http://localhost:3000/MCk');
    return (await key.text());
  }
  catch (error) {
    console.log('[fetchKey] ', error);
    throw error;
  }
}

async function fetchEval(key, eval_url) {
  try {
    const resp = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&url=${eval_url}`);
    return (await resp.json());
  }
  catch (error) {
    console.log('[fetchEval] ', error);
    throw error;
  }
}