import { ChAIN_ID, CHAIN } from '@/types/chains';
import { TableFilterOption } from '@/types/helper';

export const chains: CHAIN[] = [
  {
    id: ChAIN_ID.ETHEREUM,
    name: 'Ethereum',
    shortName: 'eth',
    iconUrl: '/images/chains/ethereum.svg',
    blockExplorers: {
      default: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
        apiUrl: 'https://api.etherscan.io/api'
      }
    }
  },
  {
    id: ChAIN_ID.ETHEREUM_SEPOLIA,
    name: 'Sepolia',
    shortName: 'sep',
    iconUrl: '/images/chains/ethereum.svg',
    blockExplorers: {
      default: {
        name: 'Etherscan',
        url: 'https://sepolia.etherscan.io',
        apiUrl: 'https://api-sepolia.etherscan.io/api'
      }
    },
    testnet: true
  },
  {
    id: ChAIN_ID.ARBITRUM,
    name: 'Arbitrum',
    shortName: 'arb1',
    iconUrl: '/images/chains/arbitrum.svg',
    blockExplorers: {
      default: {
        name: 'Arbiscan',
        url: 'https://arbiscan.io',
        apiUrl: 'https://api.arbiscan.io/api'
      }
    }
  },
  {
    id: ChAIN_ID.ARBITRUM_SEPOLIA,
    name: 'Arbitrum Sepolia',
    shortName: 'arb-sep',
    iconUrl: '/images/chains/arbitrum.svg',
    blockExplorers: {
      default: {
        name: 'Arbiscan',
        url: 'https://sepolia.arbiscan.io',
        apiUrl: 'https://api-sepolia.arbiscan.io/api'
      }
    },
    testnet: true
  },
  {
    id: ChAIN_ID.DARWINIA,
    name: 'Darwinia',
    shortName: 'darwinia',
    iconUrl: '/images/chains/darwinia.png',
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://darwinia.subscan.io'
      }
    }
  },
  {
    id: ChAIN_ID.CRAB,
    name: 'Crab',
    shortName: 'crab',
    iconUrl: '/images/chains/crab.svg',
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://crab.subscan.io'
      }
    }
  },
  {
    id: ChAIN_ID.POLYGON,
    name: 'Polygon',
    shortName: 'matic',
    iconUrl: '/images/chains/polygon.svg',
    blockExplorers: {
      default: {
        name: 'PolygonScan',
        url: 'https://polygonscan.com',
        apiUrl: 'https://api.polygonscan.com/api'
      }
    }
  },
  {
    id: ChAIN_ID.BLAST,
    name: 'Blast',
    shortName: 'blastmainnet',
    iconUrl: '/images/chains/blast.svg',
    blockExplorers: {
      default: {
        name: 'Blastscan',
        url: 'https://blastscan.io/'
      }
    }
  }
];

const filterChains = chains.filter((chain) => {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'testnet') {
    return chain.testnet;
  } else {
    return !chain.testnet;
  }
});

export const CHAIN_OPTIONS: TableFilterOption[] = chains?.map((chain) => ({
  label: chain.name,
  value: chain.id
}));
