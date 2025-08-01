import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward, Bookmark, Share2, BookOpen } from "lucide-react";

export function QuranReader() {
  const [currentAyah] = useState({
    surah: 2,
    ayah: 255,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth."
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quran Reading</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Surah Al-Baqarah, Ayah {currentAyah.ayah}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="outline">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-full h-48 bg-gradient-to-br from-islamic-cream to-islamic-gold/20 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-islamic-emerald rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <p className="text-islamic-navy dark:text-islamic-gold font-medium">Beautiful Quran Reading</p>
              </div>
            </div>
          </div>
          
          <div className="bg-islamic-cream/30 dark:bg-gray-700/30 rounded-xl p-6 mb-6">
            <p className="font-arabic text-2xl leading-loose text-islamic-emerald dark:text-islamic-gold mb-4" dir="rtl">
              {currentAyah.arabic}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {currentAyah.translation}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
          <Button className="bg-islamic-emerald hover:bg-islamic-emerald/90">
            <Play className="w-4 h-4 mr-2" />
            Listen
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="outline">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-islamic-gold hover:bg-islamic-gold/90">
            Mark as Read
          </Button>
        </div>
      </div>
    </div>
  );
}
