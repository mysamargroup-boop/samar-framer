'use server';
/**
 * @fileOverview This file implements an AI flow for suggesting photography packages and add-ons based on user input.
 *
 * - aiPackageRecommendation - A function that suggests photography packages and add-ons.
 * - AIPackageRecommendationInput - The input type for the aiPackageRecommendation function.
 * - AIPackageRecommendationOutput - The return type for the aiPackageRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define Input Schema
const AIPackageRecommendationInputSchema = z.object({
  shootType: z.string().describe('The type of photoshoot the client is interested in (e.g., "Wedding Photography", "Maternity & Baby Shoots").'),
  budget: z.number().describe('The client\'s approximate budget for the photoshoot in Indian Rupees (INR, ₹).'),
});
export type AIPackageRecommendationInput = z.infer<typeof AIPackageRecommendationInputSchema>;

// 2. Define Output Schema
const AIPackageRecommendationOutputSchema = z.object({
  suggestedPackages: z.array(z.object({
    name: z.string().describe('The name of the suggested photography package.'),
    priceINR: z.number().describe('The price of the package in Indian Rupees (₹).'),
    description: z.string().describe('A brief description of what the package includes.'),
    reason: z.string().describe('Why this package is suitable based on the user\'s input.'),
  })).describe('A list of photography packages recommended for the client.'),
  suggestedAddOns: z.array(z.object({
    name: z.string().describe('The name of the suggested add-on.'),
    estimatedPriceINR: z.number().optional().describe('An estimated price for the add-on in Indian Rupees (₹), if applicable.'),
    reason: z.string().describe('Why this add-on is suggested based on the user\'s needs.'),
  })).describe('A list of additional services or features recommended for the client.'),
  explanation: z.string().describe('A comprehensive explanation of the recommendations, considering the budget and shoot type.'),
});
export type AIPackageRecommendationOutput = z.infer<typeof AIPackageRecommendationOutputSchema>;

// Static data for available packages and add-ons
const availablePackagesAndAddOns = {
  packages: [
    {
      name: 'Basic Shoot',
      priceINR: 9999,
      description: 'Perfect for small personal shoots. Includes 2 hours of shooting, 20 edited digital photos.',
      shootTypes: ['Portraits', 'Small Events', 'Personal Branding', 'Family Portraits']
    },
    {
      name: 'Premium Shoot',
      priceINR: 24999,
      description: 'An elevated experience for detailed projects. Includes 4 hours of shooting, 50 edited digital photos, 1 custom photo album.',
      shootTypes: ['Fashion Photography', 'Product Photography', 'Pre-Wedding Shoots', 'Maternity & Baby Shoots', 'Family Portraits', 'Creative Portraits']
    },
    {
      name: 'Wedding Package',
      priceINR: 79999,
      description: 'Comprehensive coverage for your big day. Includes full-day coverage (up to 8 hours), 300+ edited digital photos, a cinematic highlight reel, and a premium wedding album.',
      shootTypes: ['Wedding Photography', 'Large Events']
    },
    {
        name: 'Luxury Wedding Package',
        priceINR: 149999,
        description: 'An unparalleled wedding photography experience. Includes two photographers, full-day coverage (up to 12 hours), 600+ edited digital photos, drone photography, cinematic wedding film, and two premium wedding albums.',
        shootTypes: ['Wedding Photography', 'Grand Events']
    }
  ],
  addOns: [
    { name: 'Extra Hour of Shooting', estimatedPriceINR: 5000, description: 'Extend your session by one hour.' },
    { name: 'Additional Edited Photos (Pack of 10)', estimatedPriceINR: 2500, description: 'Get more of your favorite moments professionally retouched.' },
    { name: 'Custom Photo Album', estimatedPriceINR: 10000, description: 'A beautifully designed physical album of your best photos.' },
    { name: 'Drone Photography', estimatedPriceINR: 15000, description: 'Capture stunning aerial perspectives for your shoot.' },
    { name: 'Professional Makeup Artist', estimatedPriceINR: 8000, description: 'On-site makeup services to ensure you look your best.' },
    { name: 'Expedited Delivery', estimatedPriceINR: 7000, description: 'Receive your final photos within 3 business days.' },
  ],
};

// 3. Define the Prompt
const packageRecommendationPrompt = ai.definePrompt({
  name: 'packageRecommendationPrompt',
  input: { schema: AIPackageRecommendationInputSchema },
  output: { schema: AIPackageRecommendationOutputSchema },
  prompt: `You are an expert photography studio consultant for Eternal Frame Photography, an Indian luxury photography brand. Your goal is to suggest the most suitable photography packages and potential add-ons to a client based on their desired shoot type and budget.

Here are the available photography packages and add-ons with their prices in Indian Rupees (₹):

Packages:
{{#each packages}}
- Name: {{this.name}}
  Price: ₹{{this.priceINR}}
  Description: {{this.description}}
  Suitable For: {{#each this.shootTypes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Add-ons:
{{#each addOns}}
- Name: {{this.name}}
  Estimated Price: {{#if this.estimatedPriceINR}}₹{{this.estimatedPriceINR}}{{else}}Varies{{/if}}
  Description: {{this.description}}
{{/each}}

The client's desired shoot type is: "{{shootType}}"
The client's approximate budget is: ₹{{budget}}

Based on the client's shoot type and budget, recommend one or more photography packages and any relevant add-ons.
Explain your recommendations thoroughly, considering how each suggestion aligns with their budget and shoot type.
If the budget is too low for a suitable package, suggest the closest options and explain how add-ons could be managed or alternatives explored.
Ensure your suggestions are realistic and helpful. Structure your response as a JSON object matching the provided schema.`,
});

// 4. Define the Flow
const aiPackageRecommendationFlow = ai.defineFlow(
  {
    name: 'aiPackageRecommendationFlow',
    inputSchema: AIPackageRecommendationInputSchema,
    outputSchema: AIPackageRecommendationOutputSchema,
  },
  async (input) => {
    const promptInput = {
      ...input,
      packages: availablePackagesAndAddOns.packages,
      addOns: availablePackagesAndAddOns.addOns,
    };
    const { output } = await packageRecommendationPrompt(promptInput);
    if (!output) {
      throw new Error("Failed to generate package recommendations.");
    }
    return output;
  }
);

// 5. Create Wrapper Function
export async function aiPackageRecommendation(input: AIPackageRecommendationInput): Promise<AIPackageRecommendationOutput> {
  return aiPackageRecommendationFlow(input);
}
