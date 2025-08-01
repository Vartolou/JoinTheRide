import { DailyHadith } from "@/components/DailyHadith";

export default function Hadith() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Daily Hadith</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn from the teachings of Prophet Muhammad (ﷺ)</p>
      </div>
      
      <DailyHadith />
    </div>
  );
}
