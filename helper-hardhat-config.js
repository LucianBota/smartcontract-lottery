const { ethers } = require("hardhat");

const networkConfig = {
	default: {
		name: "hardhat",
		interval: "30",
	},
	11155111: {
		name: "sepolia",
		entranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
		maxEntriesPerPlayer: "1000",
		vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
		gasLane:
			"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
		subscriptionId: "1391",
		callbackGasLimit: "500000", // 500,000 gas
		interval: "30", // update interval
	},
	31337: {
		name: "localhost",
		entranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
		maxEntriesPerPlayer: "1000",
		gasLane:
			"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
		callbackGasLimit: "500000", // 500,000 gas
		interval: "30", // update interval
	},
};

const developmentChains = ["hardhat", "localhost"];
const frontEndContractsFile =
	"../nextjs-lottery/constants/contractAddresses.json";
const frontEndAbiFile = "../nextjs-lottery/constants/abi.json";

module.exports = {
	networkConfig,
	developmentChains,
	frontEndContractsFile,
	frontEndAbiFile,
};
