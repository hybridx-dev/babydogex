import { type ClassValue, clsx } from "clsx"
import type OpenAI from "openai";
import { twMerge } from "tailwind-merge"
import { type TToolDefinitionMap, type TAnyToolDefinitionArray } from "../types";
import { OpenAIStream } from 'ai';
import zodToJsonSchema from 'zod-to-json-schema';
import { type z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculationFee = (fee: bigint, amount: number) =>
  (fee * BigInt(amount) * BigInt(125)) / BigInt(100);

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
export const RGBDataURL = (
  r: number = Math.floor(Math.random() * 255),
  g: number = Math.floor(Math.random() * 255),
  b: number = Math.floor(Math.random() * 255)
) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  const consumeStream = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    while (true) {
      const { done } = await reader.read();
      if (done) break;
    }
  };

  export const runAsyncFnWithoutBlocking = (
    fn: (...args: any) => Promise<any>,
  ) => {
    fn();
  };

  
export function runOpenAICompletion<
  T extends Omit<
    Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
    'functions'
  >,
  const TFunctions extends TAnyToolDefinitionArray,
>(
  openai: OpenAI,
  params: T & {
    functions: TFunctions;
  },
) {
  let text = '';
  let hasFunction = false;

  type TToolMap = TToolDefinitionMap<TFunctions>;
  let onTextContent: (text: string, isFinal: boolean) => void = () => {};

  const functionsMap: Record<string, TFunctions[number]> = {};
  for (const fn of params.functions) {
    functionsMap[fn.name] = fn;
  }

  let onFunctionCall = {} as any;

  const { functions, ...rest } = params;

  (async () => {
    consumeStream(
      OpenAIStream(
        (await openai.chat.completions.create({
          ...rest,
          stream: true,
          functions: functions.map(fn => ({
            name: fn.name,
            description: fn.description,
            parameters: zodToJsonSchema(fn.parameters) as Record<
              string,
              unknown
            >,
          })),
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true;

            if (!onFunctionCall[functionCallPayload.name]) {
              return;
            }

            // we need to convert arguments from z.input to z.output
            // this is necessary if someone uses a .default in their schema
            const zodSchema = functionsMap[functionCallPayload.name].parameters;
            const parsedArgs = zodSchema.safeParse(
              functionCallPayload.arguments,
            );

            if (!parsedArgs.success) {
              throw new Error(
                `Invalid function call in message. Expected a function call object`,
              );
            }

            onFunctionCall[functionCallPayload.name]?.(parsedArgs.data);
          },
          onToken(token) {
            text += token;
            if (text.startsWith('{')) return;
            onTextContent(text, false);
          },
          onFinal() {
            if (hasFunction) return;
            onTextContent(text, true);
          },
        },
      ),
    );
  })();

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback;
    },
    onFunctionCall: <TName extends TFunctions[number]['name']>(
      name: TName,
      callback: (
        args: z.output<
          TName extends keyof TToolMap
            ? TToolMap[TName] extends infer TToolDef
              ? TToolDef extends TAnyToolDefinitionArray[number]
                ? TToolDef['parameters']
                : never
              : never
            : never
        >,
      ) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback;
    },
  };
}

export const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))