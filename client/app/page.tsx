import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Languages, Gamepad2, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Learn Sign Language,{" "}
          <span className="text-primary">Bridge Communication</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Empowering the deaf and hard of hearing community with comprehensive
          sign language learning, translation, and practice tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Learn Sign Language
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dictionary</h3>
              <p className="text-muted-foreground mb-4">
                Search and learn thousands of sign language words with video
                demonstrations.
              </p>
              <Link href="/dictionary">
                <Button variant="link" className="p-0">
                  Explore Dictionary →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Languages className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Translator</h3>
              <p className="text-muted-foreground mb-4">
                Real-time translation between sign language and text using your
                camera.
              </p>
              <Link href="/translator">
                <Button variant="link" className="p-0">
                  Try Translator →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice Game</h3>
              <p className="text-muted-foreground mb-4">
                Test your knowledge with interactive games and improve your sign
                language skills.
              </p>
              <Link href="/game">
                <Button variant="link" className="p-0">
                  Play Game →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground mb-4">
                Join a supportive community of learners and native signers.
              </p>
              <Link href="/about">
                <Button variant="link" className="p-0">
                  Join Community →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground rounded-lg px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of learners who are breaking down communication
          barriers through sign language.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            Sign Up Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
