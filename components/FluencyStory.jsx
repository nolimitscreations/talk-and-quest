
import { useState } from 'react';
import TTSButton from './TTSButton';

export default function FluencyStory({ title, paragraphs=[], questions=[], onComplete }){
  const [step, setStep] = useState(0);

  if (step < paragraphs.length) {
    const line = paragraphs[step];
    const next = () => setStep(step+1);
    return (
      <div className="activity">
        <h3>Fluency Story: {title}</h3>
        <div className="card">
          <p style={{fontSize:18}}>{line}</p>
          <div className="center" style={{gap:12}}>
            <TTSButton text={line} label="🔊 Echo read" />
            <button className="btn" onClick={next}>Next line</button>
          </div>
        </div>
      </div>
    );
  }

  // questions
  const qi = step - paragraphs.length;
  if (qi < questions.length) {
    const q = questions[qi];
    const select = () => setStep(step+1); // no wrong answers—just move on
    return (
      <div className="activity">
        <h3>Story Questions</h3>
        <div className="card">
          <p style={{fontWeight:700}}>{q.q}</p>
          <div className="grid">
            {q.options.map((opt, idx) => (
              <button key={idx} className="btn ghost" onClick={select}>{opt}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="activity">
      <h3>Great reading!</h3>
      <div className="card center" style={{flexDirection:'column', gap:12}}>
        <p>You finished the story. High five ✋</p>
        <button className="btn" onClick={onComplete}>Continue</button>
      </div>
    </div>
  );
}
