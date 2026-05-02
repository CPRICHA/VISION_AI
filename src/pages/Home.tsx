import { useNavigate } from "react-router-dom";
import { Stethoscope, Eye, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/BlurText";
import ClickSpark from "@/components/ClickSpark";
import TiltedCard from "@/components/TiltedCard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center animate-fade-in">
            {/* Hero text */}
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent/80 p-4 shadow-lg mb-2">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
              <BlurText
                text="See your eye health more clearly."
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => {
                  console.log("Hero heading animation completed!");
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              />
              <p className="text-lg sm:text-xl text-accent/70 max-w-xl">
                Vision AI helps you understand and track your eye health with intelligent analysis and easy-to-read insights.
              </p>
            </div>

            {/* Hero image */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-border max-w-md w-full bg-card">
                <TiltedCard
                  imageSrc="/homepage.jpg"
                  altText="Eye examination"
                  captionText="Clinical eye examination"
                  containerHeight="260px"
                  containerWidth="100%"
                  imageHeight="260px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.08}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mode Selection Cards */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-12">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Professional Mode Card */}
            <Card className="group relative overflow-hidden animate-slide-up magic-bento-card magic-bento-card--border-glow magic-bento-card--text-autohide">
              <div className="relative p-6 lg:p-8 space-y-5">
                <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Stethoscope className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">
                    Professional Mode
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Advanced retina scan analysis with clinical-grade accuracy. Upload images or scan live for instant disease detection.
                  </p>
                  <ul className="space-y-1.5 mb-5 text-sm text-muted-foreground">
                    <li className="flex items-center"><span className="text-primary mr-2">✓</span> Diabetic Retinopathy Detection</li>
                    <li className="flex items-center"><span className="text-primary mr-2">✓</span> Glaucoma Risk Assessment</li>
                    <li className="flex items-center"><span className="text-primary mr-2">✓</span> Macular Degeneration Analysis</li>
                    <li className="flex items-center"><span className="text-primary mr-2">✓</span> Detailed Medical Reports</li>
                  </ul>
                </div>
                <ClickSpark
                  sparkColor="#fff"
                  sparkSize={10}
                  sparkRadius={15}
                  sparkCount={8}
                  duration={400}
                >
                  <Button
                    onClick={() => navigate("/professional")}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 shadow-md"
                    size="lg"
                  >
                    Start Analysis
                  </Button>
                </ClickSpark>
              </div>
            </Card>

            {/* Generic Mode Card */}
            <Card className="group relative overflow-hidden animate-slide-up magic-bento-card magic-bento-card--border-glow magic-bento-card--text-autohide" style={{ animationDelay: "100ms" }}>
              <div className="relative p-6 lg:p-8 space-y-5">
                <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Eye className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">
                    Generic Mode
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Wellness insights for everyday eye health. Track your habits and get personalized recommendations.
                  </p>
                  <ul className="space-y-1.5 mb-5 text-sm text-muted-foreground">
                    <li className="flex items-center"><span className="text-accent mr-2">✓</span> Eye Wellness Score Calculator</li>
                    <li className="flex items-center"><span className="text-accent mr-2">✓</span> Lifestyle Impact Analysis</li>
                    <li className="flex items-center"><span className="text-accent mr-2">✓</span> Common Condition Checks</li>
                    <li className="flex items-center"><span className="text-accent mr-2">✓</span> Daily Health Tips</li>
                  </ul>
                </div>
                <ClickSpark
                  sparkColor="#fff"
                  sparkSize={10}
                  sparkRadius={15}
                  sparkCount={8}
                  duration={400}
                >
                  <Button
                    onClick={() => navigate("/generic")}
                    className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-all duration-200 shadow-md"
                    size="lg"
                  >
                    Check Wellness
                  </Button>
                </ClickSpark>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Home;
