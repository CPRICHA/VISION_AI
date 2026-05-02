import { useState } from "react";
import { Eye, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to home
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-shell login-bubbles">
        <div className="login-inner">
          {/* Left Panel - Illustration & branding inside flowy shape */}
          <div className="login-blob-wrapper">
            <div className="login-blob">
              <div className="login-blob-inner" />
            </div>
          </div>

          {/* Right Panel - Login/Signup */}
          <div className="relative flex flex-col justify-center px-8 py-10 md:px-12 bg-[rgba(23,42,58,0.9)] backdrop-blur-xl text-[#D6F3F4]">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold">Login</h2>
              <p className="mt-1 text-sm text-[#D6F3F4]/80">
                Welcome back. Sign in to continue to your Vision AI workspace.
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full p-1 bg-[rgba(23,42,58,0.95)]">
                <TabsTrigger
                  value="login"
                  className="rounded-full text-sm text-[#D6F3F4]/80 data-[state=active]:bg-[#74B3CE] data-[state=active]:text-[#004346] data-[state=active]:shadow-md"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-full text-sm text-[#D6F3F4]/80 data-[state=active]:bg-[#74B3CE] data-[state=active]:text-[#004346] data-[state=active]:shadow-md"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#D6F3F4]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-[#74B3CE]" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-[rgba(23,42,58,0.85)] border-[#74B3CE] text-[#D6F3F4] placeholder:text-[#D6F3F4]/60 focus-visible:ring-[#74B3CE]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#D6F3F4]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#74B3CE]" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-[rgba(23,42,58,0.85)] border-[#74B3CE] text-[#D6F3F4] placeholder:text-[#D6F3F4]/60 focus-visible:ring-[#74B3CE]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs font-medium text-[#D6F3F4]/80 hover:text-[#D6F3F4] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-[#74B3CE] hover:bg-[#D6F3F4] text-[#172A3A] shadow-lg shadow-[rgba(23,42,58,0.7)]"
                  >
                    Login to Vision AI
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#D6F3F4]">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-[#74B3CE]" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 bg-[rgba(23,42,58,0.85)] border-[#74B3CE] text-[#D6F3F4] placeholder:text-[#D6F3F4]/60 focus-visible:ring-[#74B3CE]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#D6F3F4]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#74B3CE]" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-[rgba(23,42,58,0.85)] border-[#74B3CE] text-[#D6F3F4] placeholder:text-[#D6F3F4]/60 focus-visible:ring-[#74B3CE]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#D6F3F4]">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-[#74B3CE]" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-[rgba(23,42,58,0.85)] border-[#74B3CE] text-[#D6F3F4] placeholder:text-[#D6F3F4]/60 focus-visible:ring-[#74B3CE]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-[#74B3CE] hover:bg-[#D6F3F4] text-[#172A3A] shadow-lg shadow-[rgba(23,42,58,0.7)]"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
