import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/contexts/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-gray-600" />
      ) : (
        <Sun className="h-4 w-4 text-islamic-gold" />
      )}
    </Button>
  );
}
