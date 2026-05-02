import { useState } from "react";
import { ArrowLeft, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadBox from "@/components/UploadBox";
import { Progress } from "@/components/ui/progress";

const GenericMode = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<any>(null);

  const handleVisualScan = () => {
    // Mock scan result
    setTimeout(() => {
      setScanResult({
        condition: "Mild Dry Eye",
        confidence: 78,
        suggestions: [
          "Use lubricating eye drops",
          "Take regular screen breaks",
          "Increase humidity in your environment",
        ],
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/home")}
                className="hover:bg-accent/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold heading-gradient">
                  Generic Mode
                </h1>
                <p className="text-muted-foreground text-sm">
                  Wellness insights for everyday eye health
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/professional")}
              className="self-start sm:self-auto hover:bg-accent/10"
            >
              Switch to Professional
            </Button>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="wellness" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="wellness" className="gap-2">
                Eye Wellness Assessment
              </TabsTrigger>
              <TabsTrigger value="scan" className="gap-2">
                <Scan className="h-4 w-4" />
                Visual Check
              </TabsTrigger>
            </TabsList>

            {/* Eye Wellness Assessment Tab */}
            <TabsContent value="wellness" className="space-y-6 animate-fade-in mt-8">
              <Card className="p-0 border-2 overflow-hidden shadow-lg min-h-[600px]">
                <iframe
                  src="/visionai_chatbot.html"
                  title="Eye Wellness Assessment"
                  className="w-full h-[700px] md:h-[800px] border-0"
                />
              </Card>
            </TabsContent>

            {/* Visual Check Tab */}
            <TabsContent value="scan" className="space-y-6 animate-fade-in mt-8">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Upload Eye Image</h2>
                  <UploadBox
                    onUpload={handleVisualScan}
                    onScanLive={handleVisualScan}
                  />
                </div>

                <Card className="p-6 border-2 hover:border-accent/20 transition-all shadow-lg">
                  <h2 className="text-xl font-semibold mb-6">Scan Results</h2>
                  {scanResult ? (
                    <div className="space-y-6">
                      <div className="space-y-3 p-4 rounded-lg bg-accent/5">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="font-semibold text-lg">
                            {scanResult.condition}
                          </h3>
                          <span className="text-xs px-3 py-1 bg-accent/20 text-accent-foreground rounded-full whitespace-nowrap">
                            {scanResult.confidence}% confidence
                          </span>
                        </div>
                        <Progress value={scanResult.confidence} className="h-2" />
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border">
                        <h4 className="font-semibold">Suggestions</h4>
                        <ul className="space-y-2">
                          {scanResult.suggestions.map(
                            (suggestion: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-muted-foreground flex items-start"
                              >
                                <span className="text-accent mr-2">•</span>
                                {suggestion}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <Button
                        onClick={() => setScanResult(null)}
                        variant="outline"
                        className="w-full"
                      >
                        Scan Again
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[300px]">
                      <p className="text-muted-foreground text-center">
                        Upload an image to check for common eye conditions
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default GenericMode;
