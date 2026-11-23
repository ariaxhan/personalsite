import { skills } from '../../../../content/machine';
export const getStaticPaths = () => skills.map((s) => ({ params: { skill: s.name } }));
export const GET = ({ params }: { params: { skill: string } }) => {
  const s = skills.find((x) => x.name === params.skill)!;
  return new Response(`---\nname: ${s.name}\ndescription: ${s.description}\n---\n\n${s.body()}\n`, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
};
