import HomeBanner from '@/components/homePage/Banner';
import PublicHeader from '@/components/view/headers/PublicHeader';

export default function Home() {
  return (
    <main>
      <div className=" bg-teal-700 text-center text-sm py-2 px-2 text-white">
        Protect and Decorate Your Home With our Best House Crafters
      </div>
      <PublicHeader />
      <HomeBanner />
    </main>
  );
}
