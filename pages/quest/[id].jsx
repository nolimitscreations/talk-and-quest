
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import questsData from '@/data/quests.json';
import { useEffect, useState } from 'react';
import RepeatAfterMe from '@/components/RepeatAfterMe';
import SightWordSprint from '@/components/SightWordSprint';
import FluencyStory from '@/components/FluencyStory';
import { addMinutes } from '@/lib/storage';

export default function Quest(){
  const router = useRouter();
  const { id } = router.query;
  const quest = questsData.quests.find(q => q.id === id);

  const [i, setI] = useState(0);
  useEffect(() => {
    // simulate adding 1 minute per activity completion (gentle progress)
    if (i>0) addMinutes(1);
  }, [i]);

  if (!quest) return <Layout><div className="card">Loading...</div></Layout>;

  const activity = quest.activities[i];

  const onComplete = () => {
    if (i+1 < quest.activities.length) setI(i+1);
    else router.push('/'); // back home after finishing
  };

  return (
    <Layout>
      <div className="card">
        <h2>{quest.title}</h2>
        <p className="small">Targets: {quest.targets.join(', ')} • Activity {i+1} of {quest.activities.length}</p>
      </div>

      {activity?.type === 'repeat_after_me' && (
        <RepeatAfterMe items={activity.items} reward={quest.reward} onComplete={onComplete} />
      )}

      {activity?.type === 'sight_word_sprint' && (
        <SightWordSprint words={activity.words} onComplete={onComplete} />
      )}

      {activity?.type === 'fluency_story' && (
        <FluencyStory title={activity.title} paragraphs={activity.paragraphs} questions={activity.questions} onComplete={onComplete} />
      )}
    </Layout>
  );
}
