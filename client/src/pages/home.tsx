import { WelcomeSection } from "@/components/WelcomeSection";
import { QuranReader } from "@/components/QuranReader";
import { DailyHadith } from "@/components/DailyHadith";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { QiblaFinder } from "@/components/QiblaFinder";
import { FriendsActivity } from "@/components/FriendsActivity";
import { Button } from "@/components/ui/button";
import { BookOpen, Scroll, Compass, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WelcomeSection />
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/quran">
          <Button 
            variant="outline"
            className="h-auto p-6 flex flex-col items-center space-y-3 bg-white dark:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-islamic-emerald/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-islamic-emerald" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Read Quran</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Continue reading</p>
            </div>
          </Button>
        </Link>
        
        <Link href="/hadith">
          <Button 
            variant="outline"
            className="h-auto p-6 flex flex-col items-center space-y-3 bg-white dark:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-islamic-gold/10 rounded-xl flex items-center justify-center">
              <Scroll className="w-6 h-6 text-islamic-gold" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Daily Hadith</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Learn today's hadith</p>
            </div>
          </Button>
        </Link>
        
        <Link href="/qibla">
          <Button 
            variant="outline"
            className="h-auto p-6 flex flex-col items-center space-y-3 bg-white dark:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-islamic-navy/10 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-islamic-navy" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Qibla Finder</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Find direction</p>
            </div>
          </Button>
        </Link>
        
        <Link href="/friends">
          <Button 
            variant="outline"
            className="h-auto p-6 flex flex-col items-center space-y-3 bg-white dark:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-islamic-sage/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-islamic-sage" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Friends</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connect & share</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <QuranReader />
          <DailyHadith />
          <ActivityHeatmap />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <QiblaFinder />
          <FriendsActivity />
          
          {/* Messages Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
                <div className="w-6 h-6 bg-islamic-emerald text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-islamic-cream/30 dark:bg-gray-700/30 rounded-lg">
                  <div className="w-10 h-10 bg-islamic-emerald rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">SA</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Ahmad</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Barakallahu feek for sharing...</p>
                  </div>
                  <div className="w-3 h-3 bg-islamic-emerald rounded-full"></div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-islamic-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">MK</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Mohammed Khan</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">How's your Ramadan going?</p>
                  </div>
                </div>
              </div>
              
              <Link href="/messages">
                <Button className="w-full mt-4 bg-islamic-emerald hover:bg-islamic-emerald/90">
                  Open Messages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
