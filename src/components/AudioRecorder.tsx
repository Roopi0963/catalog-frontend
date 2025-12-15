// import { useState, useRef } from "react";
// import { Mic, Square, Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// const AudioRecorder = ({ onRecordingComplete, isProcessing }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       chunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) chunksRef.current.push(e.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "audio/wav" });
//         onRecordingComplete(blob);
//         stream.getTracks().forEach((track) => track.stop());
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       alert("Please enable microphone permissions.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center py-6">
//       <div className="relative">
//         {isRecording && (
//           <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping"></span>
//         )}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={isRecording ? stopRecording : startRecording}
//           disabled={isProcessing}
//           className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full shadow-xl transition-colors ${
//             isRecording ? "bg-red-500" : "bg-primary hover:bg-primary-hover"
//           }`}
//         >
//           {isProcessing ? (
//             <Loader2 className="w-8 h-8 text-white animate-spin" />
//           ) : isRecording ? (
//             <Square className="w-8 h-8 text-white fill-current" />
//           ) : (
//             <Mic className="w-8 h-8 text-white" />
//           )}
//         </motion.button>
//       </div>
//       <p className="mt-4 text-sm font-medium text-gray-600">
//         {isProcessing
//           ? "AI is analyzing..."
//           : isRecording
//           ? "Listening..."
//           : "Tap to Record"}
//       </p>
//     </div>
//   );
// };

// export default AudioRecorder;

import { useState, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Component props contract
 */
interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  isProcessing,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async (): Promise<void> => {
    try {
      if (isProcessing || isRecording) return;

      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = (): void => {
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/wav",
        });

        onRecordingComplete(audioBlob);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("Please enable microphone permissions.");
    }
  };

  const stopRecording = (): void => {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative">
        {isRecording && (
          <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping" />
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full shadow-xl transition-colors ${
            isRecording ? "bg-red-500" : "bg-primary hover:bg-primary-hover"
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : isRecording ? (
            <Square className="w-8 h-8 text-white fill-current" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </motion.button>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-600">
        {isProcessing
          ? "AI is analyzing..."
          : isRecording
          ? "Listening..."
          : "Tap to Record"}
      </p>
    </div>
  );
};

export default AudioRecorder;
