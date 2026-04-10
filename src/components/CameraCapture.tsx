import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, ImageUp, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          onCapture(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onCapture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl relative">
      <AnimatePresence mode="wait">
        {!useCamera ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-10"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-white/5'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <div className="p-4 bg-background rounded-full shadow-inner">
                  <ImageUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-medium text-foreground mb-1">Upload Room Image</p>
                  <p className="text-sm">Drag and drop, or click to browse</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <button
              onClick={() => setUseCamera(true)}
              className="w-full py-4 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors font-medium text-lg"
            >
              <Camera className="w-5 h-5" />
              Use Camera
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <button
              onClick={() => setUseCamera(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-video bg-black rounded-t-2xl overflow-hidden relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-card flex justify-center">
              <button
                onClick={capture}
                className="w-16 h-16 rounded-full border-4 border-primary p-1 hover:scale-105 transition-transform"
              >
                <div className="w-full h-full bg-primary rounded-full"></div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
