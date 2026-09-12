import { BrowserProvider, Contract, ethers, type Signer } from "ethers";

const contractAddress = "0xf883AC70aB64A7bA3429b92B31921037647d6AFd"; // Replace with your contract address
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMembersCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinner",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address payable",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            }
          ],
          "internalType": "struct Lottery.Participant",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
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
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "join",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
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
      "type": "function"
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
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "winner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "stateMutability": "view",
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

export const joinLottery = async (valueInEther: string = "1", username: string): Promise<void> => {
  await withContract(async (contract) => {
    return await contract.join(username, { value: ethers.parseEther(valueInEther) });
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

export const getMembersCount = async (): Promise<number | null> => {
    return withContract(async (contract) => {
        try {
            return await contract.getMembersCount();
        } catch (error) {
            console.error("Error getting members count:", error);
            return null;
        }
    });
};

export const getWinner = async (): Promise<Participant | null> => {
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

export interface Participant {
    addr: string;
    username: string;
}