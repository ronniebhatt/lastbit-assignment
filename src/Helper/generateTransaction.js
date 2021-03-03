const generateTransaction = async (data, utxoArray, setTx) => {
  Promise.all(
    Object.keys(data).map((address) => {
      return new Promise((resolve) => {
        fetch(
          `https://testnet-api.smartbit.com.au/v1/blockchain/address/${address}`,
        ).then((response) => {
          return new Promise(() => {
            response.json().then((transactions) => {
              console.log('transactions', transactions.address.transactions);
              if (
                transactions.address.transactions &&
                transactions.address.transactions.length !== 0
              ) {
                // setting total balance
                transactions.address.transactions.map((transaction) => {
                  utxoArray.push({...transaction});
                });
              }
              resolve();
            });
          });
        });
      });
    }),
  ).then(() => {
    setTx(utxoArray);
    console.log(utxoArray);
  });
};

export default generateTransaction;
