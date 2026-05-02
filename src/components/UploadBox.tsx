import { Upload, Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface UploadBoxProps {
  onUpload?: (file: File) => void;
  onScanLive?: () => void;
}

const UploadBox = ({ onUpload, onScanLive }: UploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-all duration-300 ${
        isDragging
          ? "border-primary bg-lavender-light/20 scale-105"
          : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
          <Upload className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Upload Retina Image</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your image here, or click to browse
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-4 w-4" />
            Choose File
          </Button>
          <Button onClick={onScanLive} className="gap-2 bg-gradient-to-r from-primary to-accent">
            <Camera className="h-4 w-4" />
            Scan Live
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UploadBox;
