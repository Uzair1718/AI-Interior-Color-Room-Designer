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
    <div className="w-full max-w-2xl mx-auto mt-12 bg-card/40 backdrop-blur-3xl border border-border/40 rounded-[2rem] overflow-hidden shadow-2xl relative">
      {/* Decorative gradient blur in background behind upload box */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!useCamera ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-10 lg:p-14 relative z-10"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-[2rem] p-8 md:p-16 text-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border/60 hover:border-primary/50 hover:bg-background/40 hover:shadow-[0_0_40px_rgba(250,89,105,0.05)]'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-6 text-muted-foreground relative z-10">
                <div className="w-16 h-16 bg-background rounded-2xl shadow-xl flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <ImageUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground mb-2">Upload Interior Image</p>
                  <p className="text-sm font-medium opacity-80 px-2 lg:px-0">Drag & drop your photo, or <span className="text-primary cursor-pointer hover:underline">browse files</span></p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 my-8 opacity-60">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border"></div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2">or capture live</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border"></div>
            </div>

            <button
              onClick={() => setUseCamera(true)}
              className="w-full py-4 bg-background border border-border/80 text-foreground rounded-2xl flex items-center justify-center gap-3 hover:bg-foreground hover:text-background hover:shadow-2xl hover:shadow-primary/20 transition-all font-bold text-base group"
            >
              <Camera className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              Activate Drone / Camera View
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
              className="absolute top-6 right-6 z-20 p-2 lg:p-3 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 hover:scale-105 transition-all border border-white/20 shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-video bg-black rounded-t-[2rem] overflow-hidden relative shadow-inner">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-t-[2rem]"></div>
            </div>
            <div className="p-8 bg-card/60 backdrop-blur-xl flex justify-center border-t border-border/20">
              <button
                onClick={capture}
                className="w-20 h-20 rounded-full border-[6px] border-primary p-1.5 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(250,89,105,0.4)] group"
              >
                <div className="w-full h-full bg-primary rounded-full group-hover:bg-primary/90 transition-colors"></div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
