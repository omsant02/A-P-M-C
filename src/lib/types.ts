import { Address } from 'viem';

// Prediction related types
export interface Prediction {
  id: string;
  text: string;
  image: string;
  coinSymbol: string;
  coinAddress?: Address;
  price: string;
  confidence: 'Low' | 'Medium' | 'High';
  timeframe: string;
  category: 'Price' | 'Technology' | 'Adoption' | 'Regulation';
  createdAt: Date;
  creatorAddress?: Address;
  transactionHash?: string;
}

// Frame interaction types
export interface FrameRequest {
  untrustedData: {
    buttonIndex: number;
    fid: number;
    castId: {
      fid: number;
      hash: string;
    };
    inputText?: string;
    address?: Address;
    timestamp: number;
  };
  trustedData?: {
    messageBytes: string;
  };
}

export interface FrameResponse {
  image: string;
  buttons: FrameButton[];
  postUrl?: string;
  inputText?: string;
  state?: string;
}

export interface FrameButton {
  text: string;
  action?: 'post' | 'link' | 'mint' | 'tx';
  target?: string;
}

// Zora integration types
export interface ZoraCoin {
  address: Address;
  name: string;
  symbol: string;
  description: string;
  image: string;
  totalSupply: string;
  currentPrice: string;
  marketCap: string;
  volume24h: string;
  createdAt: Date;
  creator: Address;
}

export interface TradeTransaction {
  hash: string;
  type: 'buy' | 'sell';
  amount: string;
  price: string;
  timestamp: Date;
  user: Address;
  coinAddress: Address;
}

// AI generation types
export interface AIGenerationRequest {
  type: 'prediction' | 'image';
  prompt?: string;
  style?: string;
  parameters?: Record<string, unknown>;
}

export interface AIGenerationResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Application state types
export interface AppState {
  currentPrediction: Prediction | null;
  predictions: Prediction[];
  userAddress?: Address;
  isLoading: boolean;
  error?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Frame button actions
export type ButtonAction = 
  | 'generate'
  | 'buy'
  | 'sell'
  | 'price'
  | 'share'
  | 'info'
  | 'back'
  | 'refresh';

// Social sharing types
export interface ShareableContent {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

// Database types (for future expansion)
export interface DatabasePrediction {
  id: string;
  prediction_text: string;
  image_url: string;
  coin_symbol: string;
  coin_address?: string;
  price: string;
  confidence: string;
  timeframe: string;
  category: string;
  created_at: string;
  creator_address?: string;
  transaction_hash?: string;
  is_active: boolean;
}