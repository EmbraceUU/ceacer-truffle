import Web3 from "web3";
import myFLagArtifact from "../../build/contracts/MyFlag.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = myFLagArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        myFLagArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.getTopics();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  getTopics: async function() {
    const { getCount } = this.meta.methods;
    const count = await getCount().call();

    const balanceElement = document.getElementById("count");
    balanceElement.innerHTML = count;

    const { topics } = this.meta.methods;
    const topicsElement = document.getElementById("topics");
    topicsElement.innerHTML = ''

    let i = 0;
    for(i=0; i<count; i++){
        const topic = await topics(i).call();
        const title = topic[0]
        const content = topic[1]
        const owner = topic[2]
        const ts = topic[3]
        topicsElement.innerHTML += `<li>${title} | ${content} | ${owner} | ${ts}</li>`
    }
  },

  postTopic: async function() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title == '') {
      alert('title is empty. ')
    }

    const { postTopic } = this.meta.methods;
    await postTopic(title, content).send({ from: this.account });
    this.getTopics();
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
