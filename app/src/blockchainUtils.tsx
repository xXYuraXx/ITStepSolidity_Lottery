import { BrowserProvider, Contract, ethers, type Signer } from "ethers";

const contractAddress = "0xD28a9A7ea578F367bD49ec19A44153De643e027D"; // Replace with your contract address
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "members",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "winner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "isManager",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "join",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getWinner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

declare global {
  interface Window {
    ethereum?: any;
  }
}

const getProvider = (): BrowserProvider | null => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async (): Promise<Signer | null> => {
  try {
    const provider = getProvider();
    return provider ? await provider.getSigner() : null;
  } catch (error) {
    console.error("MetaMask connection error:", error);
    return null;
  }
};

export const getContract = async (): Promise<Contract | null> => {
  const signer = await getSigner();
  return signer ? new Contract(contractAddress, abi, signer) : null;
};

const withContract = async (
  action: (contract: Contract) => any,
): Promise<any | void> => {
  const contract = await getContract();
  if (!contract) return;
  try {
    return await action(contract);
  } catch (error) {
    console.error("Contract interaction error:", error);
  }
};

export const joinLottery = async (valueInEther: string = "1"): Promise<void> => {
  await withContract(async (contract) => {
    return await contract.join({ value: ethers.parseEther(valueInEther) });
  });
};

export const getBalance = async (): Promise<number | null> => {
  return withContract(async (contract) => {
    try {
      const balance = await contract.getBalance();
      return Number(balance);
    } catch (error) {
      console.error("Error getting balance:", error);
      return null;
    }
  });
};

export const loteryRandom = async (): Promise<string | null> => {
  return withContract(async (contract) => {
    try {
      return await contract.random();
    } catch (error) {
      console.error("Error getting random number:", error);
      return null;
    }
  });
};

export const getWinner = async (): Promise<string | null> => {
  return withContract(async (contract) => {
    try {
      await contract.getWinner();
      return await contract.winner();
      
    } catch (error) {
      console.error("Error getting winner:", error);
      return null;
    }
  });
};

export const getIsManager = async (): Promise<boolean | null> => {
    return withContract(async (contract) => {
        try {
            const isManager = await contract.isManager();
            return isManager;
        } catch (error) {
            console.error("Error checking manager status:", error);
            return null;
        }
    });
};