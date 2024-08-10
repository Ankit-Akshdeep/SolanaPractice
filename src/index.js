import { Keypair } from "@solana/web3.js";

document
  .getElementById("generate-mnemonic")
  .addEventListener("click", generateMnemonic);

let mnemonics = [];

function generateMnemonic() {
  const mnemonicContainer = document.createElement("div");
  mnemonicContainer.className = "mnemonic-container";

  const mnemonic = Keypair.generate(); // For Solana, a mnemonic is not used directly; we generate a Keypair instead.
  const mnemonicText = mnemonic.publicKey.toBase58();

  // Display the mnemonic (public key in this case)
  const mnemonicTitle = document.createElement("h3");
  mnemonicTitle.innerText = `Mnemonic (Keypair): ${mnemonics.length + 1}`;
  mnemonicContainer.appendChild(mnemonicTitle);

  const mnemonicDisplay = document.createElement("p");
  mnemonicDisplay.innerText = `Public Key: ${mnemonicText}`;
  mnemonicContainer.appendChild(mnemonicDisplay);

  // Button to generate wallets
  const addWalletButton = document.createElement("button");
  addWalletButton.innerText = "Add Wallet";
  mnemonicContainer.appendChild(addWalletButton);

  // Container to display wallets
  const walletsContainer = document.createElement("div");
  walletsContainer.className = "wallets-container";
  mnemonicContainer.appendChild(walletsContainer);

  // Store the mnemonic and associated wallets
  mnemonics.push({
    mnemonic: mnemonic,
    wallets: [],
    walletsContainer: walletsContainer,
  });

  // Handle adding wallets
  addWalletButton.addEventListener("click", () =>
    addWallet(mnemonics.length - 1)
  );

  // Add this mnemonic section to the DOM
  document.getElementById("mnemonics-container").appendChild(mnemonicContainer);
}

function addWallet(mnemonicIndex) {
  const mnemonicData = mnemonics[mnemonicIndex];
  const wallet = Keypair.generate();
  mnemonicData.wallets.push(wallet);

  // Display the wallet's public key
  const walletDiv = document.createElement("div");
  walletDiv.className = "wallet";
  walletDiv.innerText = `Wallet ${
    mnemonicData.wallets.length
  }: Public Key - ${wallet.publicKey.toBase58()}`;

  mnemonicData.walletsContainer.appendChild(walletDiv);
}
