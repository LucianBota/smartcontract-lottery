const { ethers } = require("hardhat");

async function enterRaffle() {
	const raffle = await ethers.getContract("Raffle");
	const entranceFee = await raffle.getEntranceFee();
	await raffle.enterRaffle(1, { value: entranceFee + 1 });
	console.log("Entered with 1 entry!");
}

enterRaffle()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
