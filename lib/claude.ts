import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) throw new Error('invalid Api')

const clientAnthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })


export default clientAnthropic