import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export function FriendsActivity() {
  const friends = [
    {
      id: 1,
      name: "Sarah Ahmad",
      initials: "SA",
      activity: "Completed Surah Al-Mulk",
      timeAgo: "2h ago",
      bgColor: "bg-islamic-emerald"
    },
    {
      id: 2,
      name: "Mohammed Khan",
      initials: "MK",
      activity: "Shared a hadith",
      timeAgo: "4h ago",
      bgColor: "bg-islamic-gold"
    },
    {
      id: 3,
      name: "Fatima Hassan",
      initials: "FH",
      activity: "Reached 15-day streak",
      timeAgo: "1d ago",
      bgColor: "bg-islamic-navy"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Friends Activity</h3>
          <button className="text-islamic-emerald dark:text-islamic-gold hover:underline text-sm">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${friend.bgColor} rounded-full flex items-center justify-center`}>
                <span className="text-white text-sm font-semibold">{friend.initials}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{friend.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{friend.activity}</p>
              </div>
              <div className="text-xs text-gray-400">{friend.timeAgo}</div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-islamic-emerald/10 text-islamic-emerald dark:text-islamic-gold hover:bg-islamic-emerald/20 border-0">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friends
        </Button>
      </div>
    </div>
  );
}
