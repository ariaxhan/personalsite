import { llms } from '../content/machine';
export const GET = () => new Response(llms(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
