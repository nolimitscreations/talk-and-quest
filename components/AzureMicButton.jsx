import { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { addAttempt } from '@/lib/storage';

export default function AzureMicButton({ onTranscript }){
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/azure-token');
      if (!r.ok) {
        alert('Azure Speech is not configured yet.');
        setLoading(false);
        return;
      }
      const { token, region } = await r.json();

      const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, region);
      speechConfig.speechRecognitionLanguage = 'en-US';
      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync(result => {
        setLoading(false);
        if (result.text) {
          addAttempt(1);
          onTranscript && onTranscript(result.text);
        } else {
          onTranscript && onTranscript('');
        }
        recognizer.close();
      }, err => {
        setLoading(false);
        recognizer.close();
      });
    } catch (e) {
      setLoading(false);
    }
  };

  return <button className="btn" onClick={start} disabled={loading}>{loading ? "Listening..." : "🎙️ Say it (Azure)"}</button>;
}
