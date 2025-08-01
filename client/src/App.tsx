import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/hooks/use-auth";
import { Bell, ChevronDown } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Quran from "@/pages/quran";
import Hadith from "@/pages/hadith";
import Qibla from "@/pages/qibla";
import Friends from "@/pages/friends";
import Messages from "@/pages/messages";
import Profile from "@/pages/profile";
import Onboarding from "@/pages/onboarding";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-islamic-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-islamic-emerald to-islamic-sage rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🕌</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-islamic-emerald dark:text-islamic-gold">JoinTheRide</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Islamic Journey</p>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user && (
              <>
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative">
                  <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-islamic-emerald rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-2">
                      <button 
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-emerald"></div>
      </div>
    );
  }

  // Temporarily bypass authentication for demo
  // if (!user) {
  //   return <Onboarding />;
  // }

  return (
    <div className="min-h-screen flex flex-col pattern-overlay">
      <Header />
      
      <main className="flex-1 bg-islamic-cream dark:bg-gray-900">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quran" component={Quran} />
          <Route path="/hadith" component={Hadith} />
          <Route path="/qibla" component={Qibla} />
          <Route path="/friends" component={Friends} />
          <Route path="/messages" component={Messages} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
