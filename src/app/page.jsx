import HeroList from '../components/HeroList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroList />
    </main>
  );
}