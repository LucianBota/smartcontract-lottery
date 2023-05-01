const { network, getNamedAccounts, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

developmentChains.includes(network.name)
	? describe.skip
	: describe("Raffle Staging Tests", function () {
			let raffle, raffleEntranceFee, deployer;

			beforeEach(async function () {
				deployer = (await getNamedAccounts()).deployer;
				raffle = await ethers.getContract("Raffle", deployer);
				raffleEntranceFee = await raffle.getEntranceFee();
			});

			describe("fulfillRandomWords", function () {
				it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
					// enter the raffle
					console.log("Setting up test...");
					const startingTimeStamp = await raffle.getLatestTimeStamp();
					const accounts = await ethers.getSigners();

					console.log("Setting up Listener...");
					await new Promise(async (resolve, reject) => {
						// setup listener before we enter the raffle
						// just in case the blockchain moves REALLY fast
						raffle.once("WinnerPicked", async () => {
							console.log("WinnerPicked event fired!");
							try {
								// add our asserts here
								const recentWinner = await raffle.getRecentWinner();
								const raffleState = await raffle.getRaffleState();
								const winnerBalance = await accounts[0].getBalance();
								const endingTimeStamp = await raffle.getLatestTimeStamp();

								await expect(raffle.getPlayer(0)).to.be.reverted;
								assert.equal(recentWinner.toString(), accounts[0].address);
								assert.equal(raffleState, 0);
								assert.equal(
									winnerBalance.toString(),
									winnerStartingBalance.add(raffleEntranceFee).toString()
								);
								assert(endingTimeStamp > startingTimeStamp);
								resolve();
							} catch (e) {
								console.log(e);
								reject(e);
							}
						});
						// then entering the raffle
						console.log("Entering Raffle...");
						const tx = await raffle.enterRaffle(1, {
							value: raffleEntranceFee,
						});
						await tx.wait(1);
						console.log("Ok, time to wait...");
						const winnerStartingBalance = await accounts[0].getBalance();

						// and this code WON'T complete until our listener has finished listening!
					});
				});
			});
	  });
