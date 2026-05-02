import { useState } from "react";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import UploadBox from "@/components/UploadBox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ProfessionalMode = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = (file: File) => {
    setAnalyzing(true);
    // Mock analysis
    setTimeout(() => {
      setResults({
        diseases: [
          { name: "Diabetic Retinopathy", confidence: 87, severity: "Moderate" },
          { name: "Hemorrhages", confidence: 72, severity: "Mild" },
        ],
        recommendation: "Recommend follow-up with ophthalmologist within 2 weeks.",
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleScanLive = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        diseases: [{ name: "Healthy Retina", confidence: 95, severity: "None" }],
        recommendation: "No abnormalities detected. Continue regular eye checkups.",
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setResults(null);
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
                  Clinical Eye Analysis
                </h1>
                <p className="text-muted-foreground text-sm">
                  Professional retina scan diagnosis
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/generic")}
              className="self-start sm:self-auto hover:bg-accent/10"
            >
              Switch to Generic Mode
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Upload Section */}
            <div className="space-y-4 animate-slide-up">
              <h2 className="text-xl font-semibold">Upload Retina Image</h2>
              <UploadBox onUpload={handleUpload} onScanLive={handleScanLive} />
              {analyzing && (
                <Card className="p-6 border-2 border-primary/20 shadow-lg">
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Analyzing image...</p>
                    <Progress value={66} className="w-full" />
                  </div>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              {results ? (
                <Card className="p-6 space-y-6 border-2 hover:border-primary/20 transition-all shadow-lg">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Detected Conditions</h3>
                    {results.diseases.map((disease: any, index: number) => (
                      <div key={index} className="space-y-2 p-4 rounded-lg bg-accent/5">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{disease.name}</span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {disease.severity}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Confidence</span>
                            <span className="font-medium">{disease.confidence}%</span>
                          </div>
                          <Progress value={disease.confidence} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Recommendation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {results.recommendation}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Re-scan
                    </Button>
                    <Button className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent shadow-md">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed hover:border-primary/30 transition-all">
                  <p className="text-muted-foreground">
                    Upload an image or scan live to see results
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalMode;
