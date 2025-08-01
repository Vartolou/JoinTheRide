import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Check } from "lucide-react";

export function DailyHadith() {
  const [isMarkedAsRead, setIsMarkedAsRead] = useState(false);
  const [likes, setLikes] = useState(24);
  const [isLiked, setIsLiked] = useState(false);

  const hadith = {
    text: "The believer is not one who eats his fill while his neighbor goes hungry.",
    source: "Sahih Bukhari",
    narrator: "Prophet Muhammad (ﷺ)"
  };

  const handleMarkAsRead = () => {
    setIsMarkedAsRead(!isMarkedAsRead);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Hadith</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{hadith.source}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isMarkedAsRead 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
            }`}>
              {isMarkedAsRead ? 'Read' : 'Mark as Read'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-islamic-gold/20 to-islamic-emerald/20 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-islamic-gold rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-white text-lg">📜</span>
                </div>
                <p className="text-islamic-navy dark:text-islamic-gold text-sm font-medium">Daily Wisdom</p>
              </div>
            </div>
          </div>
          
          <blockquote className="border-l-4 border-islamic-gold pl-6 py-4 bg-islamic-cream/30 dark:bg-gray-700/30 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
              "{hadith.text}"
            </p>
            <footer className="text-sm text-gray-600 dark:text-gray-400">
              — {hadith.narrator}
            </footer>
          </blockquote>
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked 
                    ? 'text-red-500' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-islamic-emerald dark:hover:text-islamic-gold'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-islamic-emerald dark:hover:text-islamic-gold transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
            
            <Button 
              onClick={handleMarkAsRead}
              className={`text-sm ${
                isMarkedAsRead 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              <Check className="w-4 h-4 mr-2" />
              {isMarkedAsRead ? 'Marked as Read' : 'Mark as Read'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
