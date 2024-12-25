import { Button } from '@/components/ui/button';
import { Activity, Heart, Smartphone, Star, Users } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <main className="flex-1">
        <section className="w-full py-10 md:py-16 lg:py-20 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Fitness Journey with FitTrack
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Track your workouts, monitor your progress, and achieve your
                    fitness goals with our all-in-one mobile app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#download">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                      Download Now
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <img
                alt="FitTrack App"
                className="mx-auto w-72 lg:w-96"
                src="/fitness-stats.svg"
              />
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Activity className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-bold">Workout Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Log your exercises, sets, reps, and weights with ease.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Heart className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-bold">Health Monitoring</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track your heart rate, calories burned, and sleep patterns.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-bold">Community Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with friends and join fitness challenges.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Star className="mb-4 h-12 w-12 text-yellow-400" />
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  FitTrack has completely transformed my fitness routine.
                  I&quot;ve never been more motivated!
                </p>
                <p className="font-bold">- Sarah J.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="mb-4 h-12 w-12 text-yellow-400" />
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The progress tracking feature is amazing. I can see my
                  improvements week by week.
                </p>
                <p className="font-bold">- Mike T.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="mb-4 h-12 w-12 text-yellow-400" />
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  I love the community aspect. It keeps me accountable and
                  motivated.
                </p>
                <p className="font-bold">- Emily R.</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="download"
          className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Your Fitness Journey?
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Download FitTrack now and take the first step towards a
                  healthier you.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  <Smartphone className="mr-2 h-5 w-5" /> Download for iOS
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  <Smartphone className="mr-2 h-5 w-5" /> Download for Android
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
