"use server"

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { BIG_STRING } from "./bigString";


const test = "https://r.jina.ai/https://expressjs.com/en/resources/middleware/body-parser.html"

let wallOfText = '';

export async function testJina() {
  try {
    const data = await fetch(test, {
      method: "get",
    });

    const readable = await data.text();

    wallOfText = readable;
    // console.log('JINA STUFF:', readable);
  } catch (error) {
    console.log("error getting jina:", error);
  }
} 

const chatModel = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});

const outputParser = new StringOutputParser();

// Batch and stream are also supported
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert flash card writer."],
  ["user", "Please generate 5 flash cards from the given text. The output should be a JSON string array of objects that is not wrapped in backticks or include the a prepending string of 'json'. Each object should contain a 'front' property with a question regarding a relevant topic within the given text and a 'back' that contains the content that should be studied to understand the topic outlined on the front: {input}"]
]);

const chain = prompt.pipe(chatModel).pipe(outputParser);

export async function invokeBot(url: string) {
  console.log('url:', url);
  try {

    const scrapedData = await fetch(`https://r.jina.ai/${url}`, {
      method: "get",
      headers: {
        "Authorization": `Bearer ${process.env.JINA_API_KEY}`,
        "X-With-Links-Summary": "true"
      },
    });

    const textFromData = await scrapedData.text();

    console.log('scraped:', textFromData);
    const res = await chain.invoke({
      input: textFromData,
    });

    let cleanedResponse: any = res;
    // console.log('BEFORE BEING CLEANED:', cleanedResponse);

    if (res.split('')[0] === '`') {
      cleanedResponse = res.split('').slice(7, -3).join('');
      console.log('CLEANING IT UP:', cleanedResponse);
    }

    console.log('parsed response:', JSON.parse(cleanedResponse));

    return JSON.parse(cleanedResponse);
    // return scrapedText
    // return textFromData;
  } catch (error) {
    console.log("error generating flash cards:", error);
  }
}
