import { llmsFull } from '../content/machine';
export const GET = () => new Response(llmsFull(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
