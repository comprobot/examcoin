const { ApiPromise, WsProvider } = require('@polkadot/api');
const util = require("@polkadot/util-crypto");
import {
	isWeb3Injected,
	web3Accounts,
	web3Enable,
	web3FromAddress
} from "@polkadot/extension-dapp";
web3Enable('polkadot-js/apps');

// Samples
class PolkadotWeb3JSSample {
	
	/***
	 * decodeToAddress
	 * @return {"address":"5D2JMakX2CgtPPkiqUzdsK3Y41vD6HyNy8ZETUjhjRrZFTfG"}

	 */
	async decodeToAddress(from,prefix) {
		
		const prefixes = {
			polkadot: 0,
			kusama: 2,
			plasm: 5,
			bifrost: 6,
			edgeware: 7,
			karura: 8,
			reynolds: 9,
			acala: 10,
			laminar: 11,
			substratee: 13,
			kulupu: 16,
			darwinia: 18,
			robonomics: 32,
			centrifuge: 36,
			substrate: 42,
			chainx: 44
		};
		if (typeof prefix !== "number") {
			prefix = prefixes[prefix] || 42;
		}
		
		let decoded = util.decodeAddress(from);
		return util.encodeAddress(from, prefix);

	}	
	
	
	/***
	 * login
	 * @return accounts [{"address":"5D2JMakX2CgtPPkiqUzdsK3Y41vD6HyNy8ZETUjhjRrZFTfG","meta":{"name":"cc1","source":"polkadot-js"}}]

	 */
	async login() {
		if (!isWeb3Injected) {
			throw new Error("Please install/unlock the MathWallet first");
		}
		// meta.source contains the name of the extension that provides this account
		const allAccounts = await web3Accounts();
		return allAccounts;
	}
	
	/***
	 * login / show edgeware account
	 * @return accounts [{"address":"5D2JMakX2CgtPPkiqUzdsK3Y41vD6HyNy8ZETUjhjRrZFTfG","meta":{"name":"cc1","source":"polkadot-js"}}]

	 */
	async loginEdgeware() {
		if (!isWeb3Injected) {
			throw new Error("Please install/unlock the MathWallet first");
		}
		// meta.source contains the name of the extension that provides this account
		const allAccounts = await web3Accounts();
		return allAccounts;
	}	
	

	/***
	 * Transfer
	 * @param from from
	 * @param to to
	 * @param amount amount
	 * @return hash
	 */
	async transfer(from, to, amount) {

		//////////////////////////// alexander  ////////////////////////////
		// Initialise the provider to connect to the local node
		const provider = new WsProvider('ws://localhost:9944');
		// Create the API and wait until ready
		const api = await ApiPromise.create({ provider });

		// finds an injector for an address
		const injector = await web3FromAddress(from);

		// sets the signer for the address on the @polkadot/api
		api.setSigner(injector.signer);

		// sign and send out transaction - notice here that the address of the account (as retrieved injected)
		// is passed through as the param to the `signAndSend`, the API then calls the extension to present
		// to the user and get it signed. Once completex, the api sends the tx + signature via the normal process
		const h = api.tx.balances
			.transfer(to, amount)
			.signAndSend(from);

		return h;
	}

	/***
	 * Remark
	 * @param from from
	 * @param content content
	 * @return hash
	 */
	async remark(from, content) {

		//////////////////////////// alexander  ////////////////////////////
		// Initialise the provider to connect to the local node
		const provider = new WsProvider('ws://localhost:9944');
		// Create the API and wait until ready
		const api = await ApiPromise.create({ provider });

		// finds an injector for an address
		const injector = await web3FromAddress(from);

		// sets the signer for the address on the @polkadot/api
		api.setSigner(injector.signer);

		// sign and send out transaction - notice here that the address of the account (as retrieved injected)
		// is passed through as the param to the `signAndSend`, the API then calls the extension to present
		// to the user and get it signed. Once completex, the api sends the tx + signature via the normal process
		const h = api.tx.system
			.remark(content)
			.signAndSend(from);

		return h;
	}
}

window.PolkadotWeb3JSSample = new PolkadotWeb3JSSample();
