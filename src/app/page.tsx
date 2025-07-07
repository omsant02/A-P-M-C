export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          🤖 AI Prediction Meme Coiner
        </h1>
        
        <p className="text-xl text-blue-100 mb-8">
          AI generates crypto predictions, creates viral memes, and makes them tradeable coins instantly!
        </p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">
            🚀 How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-semibold mb-2">AI Predicts</h3>
              <p className="text-sm text-blue-100">
                Advanced AI analyzes crypto trends and generates bold predictions
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Creates Memes</h3>
              <p className="text-sm text-blue-100">
                Transforms predictions into viral meme images automatically
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-4xl mb-3">🪙</div>
              <h3 className="font-semibold mb-2">Makes Coins</h3>
              <p className="text-sm text-blue-100">
                Instantly creates tradeable coins on Zora for each prediction
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-yellow-400/20 rounded-xl border border-yellow-400/30">
          <h3 className="text-xl font-semibold text-yellow-100 mb-2">
            📱 Use in Farcaster
          </h3>
          <p className="text-yellow-200 mb-4">
            This frame works directly in Farcaster feeds. Share the URL and users can interact without leaving their timeline!
          </p>
          <div className="p-3 bg-black/30 rounded-lg">
            <code className="text-green-300 text-sm">
              localhost:3000/api/frame
            </code>
          </div>
        </div>
        
        <div className="mt-8">
          <iframe 
            src="/api/frame" 
            className="w-full max-w-2xl mx-auto h-96 rounded-xl border border-white/20"
            title="AI Prediction Frame Preview"
          />
        </div>
        
        <div className="mt-8 text-blue-200">
          <p className="text-sm">
            Built for Zora Coinathon • Powered by OpenAI & Zora Protocol
          </p>
        </div>
      </div>
    </div>
  );
}