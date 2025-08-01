import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const { signInWithPhone } = useAuth();
  const [, setLocation] = useLocation();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithPhone(phoneNumber);
      setConfirmationResult(result);
      setStep(2);
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmationResult.confirm(verificationCode);
      setLocation("/");
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-islamic-emerald to-islamic-sage rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🕌</span>
          </div>
          <CardTitle className="text-2xl font-bold text-islamic-emerald dark:text-islamic-gold">
            Welcome to JoinTheRide
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            اركب معنا - Join the spiritual journey
          </p>
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-islamic-emerald hover:bg-islamic-emerald/90">
                Send Verification Code
              </Button>
              <div id="recaptcha-container"></div>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-islamic-emerald hover:bg-islamic-emerald/90">
                Verify & Continue
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
