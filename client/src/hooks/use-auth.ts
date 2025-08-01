import { useState, useEffect } from "react";
import { User, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
    
    return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return {
    user,
    loading,
    signInWithPhone,
    logout,
  };
}
