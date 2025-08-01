import { QiblaFinder } from "@/components/QiblaFinder";

export default function Qibla() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Qibla Direction</h1>
        <p className="text-gray-600 dark:text-gray-400">Find the direction to the Kaaba for prayer</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <QiblaFinder />
      </div>
    </div>
  );
}
