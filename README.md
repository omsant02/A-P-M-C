# 🤖 AI Prediction Meme Coiner

**The first social platform that turns AI-generated crypto predictions into tradeable memes and instant coins.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-black?style=for-the-badge)](https://a-p-m-c-om-santoshwars-projects.vercel.app)
[![Farcaster Frame](https://img.shields.io/badge/📱_Farcaster-Frame-purple?style=for-the-badge)](https://a-p-m-c-om-santoshwars-projects.vercel.app/api/frame)
[![Built for Zora](https://img.shields.io/badge/⚡_Built_for-Zora_Coinathon-blue?style=for-the-badge)](https://coinathon.encode.club/)

## 🎯 **What is AI Prediction Meme Coiner?**

A revolutionary Farcaster frame that combines **AI predictions**, **viral memes**, and **instant tokenization** to create the ultimate crypto prediction market. Users can generate AI-powered crypto predictions, turn them into shareable memes, and immediately create tradeable coins on Zora Protocol.

### 🔥 **Key Innovation**
- **First-ever** combination of AI content generation + prediction markets + instant tokenization
- **Viral mechanics** through meme sharing + financial incentives
- **Creator monetization** through prediction accuracy and trading fees
- **Social trading** where memes become investment opportunities

## 🎮 **Demo Instructions for Judges**

**Testing the Frame:**
1. **Visit**: [`https://a-p-m-c-om-santoshwars-projects.vercel.app/api/frame`](https://a-p-m-c-om-santoshwars-projects.vercel.app/api/frame)
2. **Click "🎲 Generate New Prediction"** - Frame shows "AI is generating..."
3. **Wait 5-10 seconds** for real DALL-E generation
4. **Click "🔄 Check Status"** to see the completed AI meme
5. **Try other buttons**: "💰 Buy", "📊 Price", "🔄 Refresh"

**What You'll Experience:**
- Real GPT-4o generated crypto predictions
- DALL-E 3 viral meme images (generated async to avoid timeout)
- Zora coin creation on Base Sepolia
- Functional trading simulation with price dynamics

## 🚀 **How It Works**

### **For Users (The Magic Experience):**

1. **🎲 Generate Prediction**
   - Click "Generate New Prediction" in Farcaster
   - AI analyzes crypto trends and creates a bold prediction
   - DALL-E 3 generates a viral meme about the prediction
   - Zora coin is created instantly on Base Sepolia

2. **💰 Trade Predictions**
   - Buy coins if you believe the prediction will come true
   - Sell coins if you think it won't happen
   - Trade directly in the Farcaster frame

3. **📈 Social Speculation**
   - Share predictions that go viral
   - Earn from accurate predictions
   - Participate in a new form of social trading

4. **🎉 Creator Rewards**
   - Prediction creators earn 2.5% on all trades
   - Successful predictions drive more trading volume
   - Viral memes create network effects

## 🛠 **Technology Stack**

### **Frontend & Framework**
- **Next.js 15** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling with glassmorphism effects
- **Farcaster Frames** - Native social media integration

### **AI Integration**
- **OpenAI GPT-4o** - Advanced crypto prediction generation
- **DALL-E 3** - Viral meme image creation
- **Smart prompting** - Context-aware AI responses
- **Async processing** - Handles 5-second frame timeout limits

### **Blockchain & Web3**
- **Zora Protocol CoinV4** - Instant coin creation and trading
- **Base Sepolia** - Fast, cheap transactions for hackathon
- **Viem** - TypeScript Ethereum interface
- **Uniswap V4** - Automated market making

### **Infrastructure**
- **Vercel** - Serverless deployment
- **IPFS** - Decentralized metadata storage
- **Image Proxy** - Solves CORS issues for Farcaster frames
- **Base Sepolia** - Testnet for development and demo

## 🏗 **Architecture**

```
User Interaction (Farcaster)
           ↓
    Frame API (Next.js)
           ↓
┌─────────────────────────────────┐
│  AI Engine (OpenAI)             │
│  • GPT-4o → Predictions         │
│  • DALL-E 3 → Meme Images       │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│  Zora Protocol Integration      │
│  • Metadata → IPFS              │
│  • CoinV4 → Base Sepolia        │
│  • Trading → Uniswap V4         │
└─────────────────────────────────┘
           ↓
    Updated Frame Response
```

## 🎯 **Hackathon Criteria Alignment**

### **✅ Originality (Mind-blowing)**
- **Never been done**: First AI + memes + prediction markets + instant coins
- **Viral mechanics**: Financial incentives meet social sharing
- **Novel UX**: Predict the future, meme it, trade it

### **✅ Utility (Actually Useful)**
- **Creator monetization**: Earn from prediction accuracy
- **Social entertainment**: Viral memes + crypto speculation  
- **Investment opportunity**: Bet on prediction outcomes
- **Community building**: Shared economic incentives

### **✅ Zora Integration (Proper Protocol Usage)**
- **CoinV4 Implementation**: Real coin creation on Base Sepolia
- **Protocol rewards**: Creator earnings from trading fees
- **Metadata standards**: Proper IPFS integration
- **Trading infrastructure**: Uniswap V4 market making

### **✅ Polish (Professional Grade)**
- **Beautiful UI**: Modern glassmorphism design
- **Smooth UX**: One-click interactions in Farcaster
- **Error handling**: Graceful fallbacks throughout
- **Production ready**: Deployed and tested

## 🎨 **Key Features**

### **🤖 AI-Powered Predictions**
- GPT-4o analyzes crypto trends and market sentiment
- Generates specific, bold predictions with confidence levels
- Categorizes predictions (Price, Technology, Adoption, Regulation)
- Smart fallback system ensures reliability

### **🎭 Viral Meme Generation**
- DALL-E 3 creates shareable meme images
- Multiple meme styles (Pepe, Wojak, Diamond Hands, etc.)
- Optimized for social media sharing
- Automatic crypto symbol integration

### **🪙 Instant Tokenization**
- One-click coin creation on Zora Protocol
- Real Base Sepolia deployment for hackathon
- Automatic Uniswap V4 pool creation
- Creator earnings on every trade

### **📱 Farcaster Native**
- Works directly in social feeds
- No app switching required
- Native button interactions
- Seamless sharing experience

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- OpenAI API key
- Zora API key (optional for enhanced features)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/omsant02/A-P-M-C.git
cd A-P-M-C

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev
```

### **Environment Variables**

```env
OPENAI_API_KEY=your_openai_api_key
ZORA_API_KEY=your_zora_api_key
NEXT_PUBLIC_URL=http://localhost:3000
```

### **Deployment**

```bash
# Build and deploy to Vercel
vercel --prod

# Or deploy via GitHub integration
git push origin main
```

## 📊 **Market Opportunity**

### **Problem We Solve**
- **Creator monetization**: Hard to monetize predictions and content
- **Prediction markets**: Complex UX, not social
- **Meme economy**: No direct monetization
- **Social trading**: Lacks viral mechanics

### **Our Solution**
- **Direct monetization**: Creators earn from accuracy + trading
- **Social-first design**: Built for sharing and virality
- **Gamified speculation**: Memes make trading fun
- **Network effects**: Viral content drives platform growth

### **Market Size**
- **Prediction markets**: $200M+ and growing
- **Creator economy**: $100B+ addressable market
- **Meme coins**: Billions in trading volume
- **Social trading**: Major trend in crypto

## 🏆 **Competitive Advantages**

1. **First Mover**: No direct competitors combining all elements
2. **Viral Mechanics**: Built-in sharing incentives
3. **Low Friction**: Works within existing social platforms
4. **Real Utility**: Actual prediction market functionality
5. **Creator Economy**: Direct monetization model

## 🗺 **Roadmap**

### **Phase 1: Hackathon Demo** ✅
- Basic AI prediction generation
- Meme creation and sharing
- Zora coin integration
- Farcaster frame deployment

### **Phase 2: Enhanced Features**
- Real-time price feeds
- Prediction accuracy tracking
- Leaderboards and rankings
- Enhanced meme templates

### **Phase 3: Scale & Growth**
- Multi-chain deployment
- Community governance
- Creator tools and analytics
- Mobile app development

## 👥 **Team**

**Om Santoshwar** - Full Stack Developer & Product
- Blockchain development and AI integration
- Product design and user experience
- Smart contract integration

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Zora Protocol** - For the amazing CoinV4 infrastructure
- **OpenAI** - For GPT-4o and DALL-E 3 APIs
- **Farcaster** - For the social protocol
- **Base** - For fast, cheap transactions
- **Encode Club** - For organizing the Zora Coinathon

## 📞 **Contact**

- **Website**: [Live Demo](https://a-p-m-c-om-santoshwars-projects.vercel.app)
- **Frame**: [Try in Farcaster](https://a-p-m-c-om-santoshwars-projects.vercel.app/api/frame)
- **GitHub**: [Source Code](https://github.com/omsant02/A-P-M-C)

---

**Built with ❤️ for the Zora Coinathon 2025**

*Turning AI predictions into viral memes and tradeable assets.*
