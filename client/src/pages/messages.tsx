import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Messages() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400">Chat with your friends</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-96">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Sarah Ahmad</h3>
        </div>
        
        <div className="flex-1 p-4 space-y-4 h-80 overflow-y-auto">
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-gray-900 dark:text-white">Assalamu alaikum! How's your Quran reading going?</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-islamic-emerald text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">Wa alaikum assalam! Alhamdulillah, I completed another hizb today.</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon" className="bg-islamic-emerald hover:bg-islamic-emerald/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
