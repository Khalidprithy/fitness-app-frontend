import Banner from '../(landing-page)/Banner';
import Hero from '../(landing-page)/Hero';

export default function page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Hero />
      <Banner />
    </div>
  );
}
