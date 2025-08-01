import { Link, useLocation } from "wouter";
import { Home, BookOpen, Compass, Users, User } from "lucide-react";

export function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/quran", icon: BookOpen, label: "Quran" },
    { path: "/qibla", icon: Compass, label: "Qibla" },
    { path: "/friends", icon: Users, label: "Friends" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <button 
                className={`flex flex-col items-center space-y-1 ${
                  isActive ? 'text-islamic-emerald' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
