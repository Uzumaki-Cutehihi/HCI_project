"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Volume2, Download, Copy } from "lucide-react";

export default function TranslatorPage() {
  const [mode, setMode] = useState<"text-to-sign" | "sign-to-text">(
    "sign-to-text"
  );
  const [translatedText, setTranslatedText] = useState("nine");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsLoading(true);
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      console.log("Camera stream obtained:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log("Video srcObject set");

        // Set camera active immediately after setting srcObject
        setIsCameraActive(true);
        setIsLoading(false);

        // Try to play the video
        videoRef.current
          .play()
          .then(() => {
            console.log("Video started playing");
          })
          .catch((playError) => {
            console.error("Error playing video:", playError);
            // Even if autoplay fails, the video is still active
          });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Cannot access camera. Please check permissions.");
      setIsLoading(false);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsLoading(false);
    setCameraError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Translator</h1>
        <p className="text-muted-foreground mb-2">
          <span className="text-accent font-semibold">
            Text to Sign Language:
          </span>{" "}
          Converts written text into accurate sign language animations, enabling
          easy understanding for hearing-impaired users.
        </p>
        <p className="text-muted-foreground">
          <span className="text-accent font-semibold">
            Sign Language to Text:
          </span>{" "}
          Users can express sign language through a camera, which is recognized
          and converted back into text.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={mode === "text-to-sign" ? "default" : "outline"}
          onClick={() => setMode("text-to-sign")}
          className="flex items-center gap-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Translate Text to ASL
        </Button>
        <Button
          variant={mode === "sign-to-text" ? "default" : "outline"}
          onClick={() => setMode("sign-to-text")}
          className="flex items-center gap-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          Translate ASL to Text
        </Button>
      </div>

      {/* Translator Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Camera/Input */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "sign-to-text"
                ? "Sign Language Detection"
                : "Text Input"}
            </h2>

            {mode === "sign-to-text" ? (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  {/* Video element - always rendered but conditionally displayed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
                      isCameraActive ? "block" : "hidden"
                    }`}
                    onLoadedMetadata={(e) => {
                      console.log("Video metadata loaded");
                      e.currentTarget.play().catch(console.error);
                    }}
                  />

                  {/* Loading state */}
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
                      <p className="text-sm text-muted-foreground">
                        Starting camera...
                      </p>
                    </div>
                  )}

                  {/* Error state */}
                  {cameraError && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4">
                      <Camera className="h-16 w-16 text-red-500 mb-2" />
                      <p className="text-sm text-red-500 text-center">
                        {cameraError}
                      </p>
                    </div>
                  )}

                  {/* Idle state */}
                  {!isCameraActive && !isLoading && !cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Camera className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Starting..."
                    : isCameraActive
                    ? "Stop Camera"
                    : "Start Camera"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter text to translate to sign language..."
                  className="min-h-[300px] resize-none"
                />
                <Button className="w-full">Translate to Sign Language</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Output */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {mode === "sign-to-text"
                  ? "Translated Text"
                  : "Sign Language Animation"}
              </h2>
              <select className="border rounded-md px-3 py-1 text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            {mode === "sign-to-text" ? (
              <div className="space-y-4">
                <div className="min-h-[300px] p-4 bg-muted rounded-lg">
                  <p className="text-lg">{translatedText}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Sign language animation will appear here
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Animation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
