const { ethers, network } = require("hardhat");
const fs = require("fs");
const {
	frontEndContractsFile,
	frontEndAbiFile,
} = require("../helper-hardhat-config");

module.exports = async function () {
	if (process.env.UPDATE_FRONT_END) {
		console.log("Updating front end...");
		updateContractAdresses();
		updateAbi();
	}
};

async function updateAbi() {
	const raffle = await ethers.getContract("Raffle");
	fs.writeFileSync(
		frontEndAbiFile,
		raffle.interface.format(ethers.utils.FormatTypes.json)
	);
}

async function updateContractAdresses() {
	const raffle = await ethers.getContract("Raffle");
	const chainId = network.config.chainId.toString();
	const currentAddresses = JSON.parse(
		fs.readFileSync(frontEndContractsFile, "utf8")
	);
	if (chainId in currentAddresses) {
		if (!currentAddresses[chainId].includes(raffle.address)) {
			currentAddresses[chainId].push(raffle.address);
		}
	} else {
		currentAddresses[chainId] = [raffle.address];
	}
	fs.writeFileSync(frontEndContractsFile, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
