import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import Layout from "../components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ScanHistory {
  id: number;
  date: string;
  mode: string;
  result: string;
  confidence: number;
}

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    age: "35",
    gender: "Male",
    profilePhoto: null as string | null,
  });

  const [scanHistory] = useState<ScanHistory[]>([
    {
      id: 1,
      date: "2024-01-15",
      mode: "Professional",
      result: "Diabetic Retinopathy",
      confidence: 92,
    },
    {
      id: 2,
      date: "2024-01-10",
      mode: "Generic",
      result: "Dry Eye",
      confidence: 78,
    },
    {
      id: 3,
      date: "2024-01-05",
      mode: "Professional",
      result: "Healthy",
      confidence: 95,
    },
  ]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">Manage your personal information and view scan history</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Information */}
          <Card className="lg:col-span-1 p-6 animate-scale-in border-2 hover:border-primary/20 transition-all shadow-lg">
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Photo */}
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden shadow-lg">
                  {profileData.profilePhoto ? (
                    <img
                      src={profileData.profilePhoto}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-16 w-16 text-white" />
                  )}
                </div>
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <button
                  onClick={() => document.getElementById("photo-upload")?.click()}
                  className="absolute bottom-0 right-0 h-10 w-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Upload className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Profile Fields */}
              <div className="w-full space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent shadow-md">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>

          {/* Scan History */}
          <Card className="lg:col-span-2 p-6 animate-slide-up border-2 hover:border-accent/20 transition-all shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Scan History</h2>
            <div className="space-y-4">
              {scanHistory.map((scan) => (
                <div
                  key={scan.id}
                  className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-all duration-200 hover:shadow-md bg-accent/5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{scan.result}</h3>
                      <p className="text-sm text-muted-foreground">{scan.mode} Mode</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{scan.date}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Confidence</span>
                      <span className="text-sm font-medium">{scan.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${scan.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
