'use server';
/**
 * @fileOverview This file provides an AI-powered portfolio suggestion tool.
 * It allows clients to query the photography portfolio using natural language
 * and receive curated suggestions of relevant categories.
 *
 * - suggestPortfolioCategories - A function that handles the portfolio suggestion process.
 * - AIPortfolioSuggestionsInput - The input type for the suggestPortfolioCategories function.
 * - AIPortfolioSuggestionsOutput - The return type for the suggestPortfolioCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPortfolioSuggestionsInputSchema = z.object({
  query: z.string().describe('The natural language query from the client.'),
});
export type AIPortfolioSuggestionsInput = z.infer<
  typeof AIPortfolioSuggestionsInputSchema
>;

const AIPortfolioSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested photography categories relevant to the query.'),
  reasoning: z
    .string()
    .describe('A brief explanation of why these categories were suggested.'),
});
export type AIPortfolioSuggestionsOutput = z.infer<
  typeof AIPortfolioSuggestionsOutputSchema
>;

export async function suggestPortfolioCategories(
  input: AIPortfolioSuggestionsInput
): Promise<AIPortfolioSuggestionsOutput> {
  return aiPortfolioSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPortfolioSuggestionsPrompt',
  input: {schema: AIPortfolioSuggestionsInputSchema},
  output: {schema: AIPortfolioSuggestionsOutputSchema},
  prompt: `You are an AI assistant for Eternal Frame Photography Studio. Your task is to analyze a client's natural language query about photography preferences and suggest relevant portfolio categories from the provided list. Explain your reasoning.

Available Portfolio Categories:
- Wedding Photography
- Pre-Wedding Shoots
- Fashion Photography
- Product Photography
- Maternity & Baby Shoots

Client Query: {{{query}}}

Based on the client's query, suggest the most relevant categories and provide a brief reasoning.`,
});

const aiPortfolioSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiPortfolioSuggestionsFlow',
    inputSchema: AIPortfolioSuggestionsInputSchema,
    outputSchema: AIPortfolioSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
