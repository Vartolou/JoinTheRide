import { useAuth } from "@/hooks/use-auth";
import { Calendar, BookOpen } from "lucide-react";

export function WelcomeSection() {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-islamic-emerald to-islamic-navy rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E\")"
          }}></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">
            Assalamu Alaikum, {user?.displayName || 'Friend'}
          </h2>
          <p className="text-islamic-cream/90 mb-4">Continue your spiritual journey today</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-islamic-gold" />
              <span>Hizb 12 of 60</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-islamic-gold" />
              <span>Day 18 of Ramadan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
