import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Settings } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-islamic-emerald rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user.displayName || 'User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reading Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                <span className="font-semibold text-islamic-emerald">18 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Readings</span>
                <span className="font-semibold text-islamic-emerald">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Hizbs Completed</span>
                <span className="font-semibold text-islamic-emerald">12/60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Hadiths Read</span>
                <span className="font-semibold text-islamic-emerald">45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
