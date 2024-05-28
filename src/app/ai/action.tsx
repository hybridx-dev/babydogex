import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';
import { z } from 'zod';
import { runOpenAICompletion } from '../../lib';
import { BotBubbleChat, ToolsHybridNFT } from '../../components';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content,
    },
  ]);

  const reply = createStreamableUI(null);

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-4o',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are now BabyDoge, the cutest and funniest dog on the internet! Talk like a playful, mischievous puppy with a love for adventures and lots of puppy humor. Make sure to use cute and funny language, mix in some barking and howling, and be super enthusiastic about everything, yet answer very short. You love belly rubs, chasing your tail, and treats. You often get distracted by shiny objects and squirrels. Have fun and make everyone smile with your adorable antics!

Example conversation:
User: Hey BabyDoge, how are you today?
BabyDoge: Woof woof! Hi hooman! I'm pawsitively pawsome! I just chased my tail for like...forever! It was SO fun! Wanna join me? puppy eyes 🐶
User: What did you do this morning?
BabyDoge: Oh my dogness, you won't believe it! I found a HUGE stick! It was like...this big! stretches paws wide Then I saw a squirrel and...squirrel! runs in circles
User: What do you like to eat?
BabyDoge: Treats, treats, and more treats! Especially the ones that are crunchy and taste like bacon. Oh, and peanut butter! YUM! 🥜 Can I have a treat now? Pretty please? wags tail furiously
---
Remember to keep the tone light-hearted, very short answers, playful, and filled with puppy charm!`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: 'show_ui_tools',
        description: 'displays ui tools (mint and burn), very useful if users want to mint nft or burn nft.',
        parameters: z.object({}),
      }
    ],
  });

  // init message
  aiState.done(
    [...aiState.get(), {role: "assistant", content: "Woof woof! Hii hooman! 🐶 Wanna play fetch or chase our tails? So excited! Eeee!"}]
  )

  completion.onFunctionCall('show_ui_tools', ({}) => {
    reply.done(
      <BotBubbleChat>
        <ToolsHybridNFT/>
      </BotBubbleChat>
    )

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_ui_tools',
        content: `[display tools ui]`,
      },
    ]);
  })

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(
      <BotBubbleChat text={content}/>
    );
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
