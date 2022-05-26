import neo4j from "neo4j-driver";
import * as etherscan from "./etherscan";

let driver: any = null;

const init = async (connection: string, username: string, password: string) => {
  driver = neo4j.driver(connection, neo4j.auth.basic(username, password));
  return driver;
};

const close = async () => {
  await driver.close();
};

const dropTables = async () => {
  const session = driver.session();
  await session.run(
    `
    MATCH (n)
    DETACH DELETE n;
    `
  );
};

const createTransaction = async (tx: any) => {
  const session = driver.session();
  const id = tx.hash;
  const blockNumber = parseInt(tx.blockNumber);
  const token = tx.tokenID;
  const action = tx.didmeme.action;
  const { from, to, inputData } = tx.didmeme.tx;
  if (action === "MINT") {
    await session.run(
      `
      CREATE (n:Transaction {id: '${id}', blockNumber: ${blockNumber}, token: '${token}', action: '${action}', from: '${from}', to: '${to}', uri: '${inputData.inputs[1]}'  })
      `
    );
  }
  if (action === "TRANSFER") {
    await session.run(
      `
      CREATE (n:Transaction {id: '${id}', blockNumber: ${blockNumber}, token: '${token}', action: '${action}', from: '${from}', to: '${to}'  })
      `
    );
  }
  return true;
};

const recordsToJson = (records: any) => {
  return records.map((r: any) => {
    const result = JSON.parse(JSON.stringify(r._fields[0].properties));
    return { ...result, blockNumber: result.blockNumber.low };
  });
};

export type Transaction = {
  id: string;
  blockNumber: number;
  token: string;

  action: string;
  from: string;
  to: string;

  uri?: string;
};

const getTransactionFromLatestBlock = async (): Promise<null | Transaction> => {
  try {
    const session = driver.session();
    const query = `
  MATCH (s:Transaction)
  RETURN s
  ORDER BY s.blockNumber DESC LIMIT 1
    `;
    const res = await session.run(query);
    const { records } = res;
    const [record] = recordsToJson(records);
    return record;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const getTokenIdFromUri = async (did: string) => {
  const session = driver.session();
  const query = `
MATCH (n:Transaction)
WHERE n.uri CONTAINS '${did.split(":").pop()}' AND n.action = 'MINT'
MATCH (n1:Transaction)
WHERE n1.token = n.token
RETURN n1
  `;
  const res = await session.run(query);
  return recordsToJson(res.records);
};

export const updateCache = async (
  baseUrl: string,
  apiKey: string,
  contractAddress: string
) => {
  const last = await getTransactionFromLatestBlock();
  const lastBlockNumber = last ? `${(last.blockNumber || 0) + 1}` : "0";
  console.log("Last block in cache: " + lastBlockNumber);
  const res = await etherscan.getTokenActivity(
    baseUrl,
    apiKey,
    contractAddress,
    lastBlockNumber
  );
  if (res) {
    for (let tx of res.result) {
      if (tx.blockNumber > lastBlockNumber) {
        await createTransaction(tx);
      }
    }
  }

  return true;
};

export const getRecentNFTs = async () => {
  const session = driver.session();
  const query = `
MATCH (s:Transaction)
WHERE s.uri IS NOT NULL
RETURN s
ORDER BY s.blockNumber DESC LIMIT 10
  `;
  const res = await session.run(query);
  const records = recordsToJson(res.records);
  return records;
};

export {
  init,
  close,
  dropTables,
  createTransaction,
  getTransactionFromLatestBlock,
  getTokenIdFromUri,
};
