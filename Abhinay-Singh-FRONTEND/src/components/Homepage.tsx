import { Zap, FileText, Shield } from "lucide-react";

export default function Homepage() {
  return (
    <div className=" flex flex-col">
      {/* Hero Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Real-time AI-Powered</span>
              <span className="block text-indigo-600">
                Plagiarism Detection
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Instantly analyze your documents for plagiarism using advanced AI
              technology.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/check-plagiarism"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Upload Your Document
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-2xl text-indigo-600 font-bold tracking-wide uppercase underline underline-offset-8">
              Features
            </h2>
            <p className="font-semibold mt-2 text-3xl leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Why Choose PlagiarismAI?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform offers cutting-edge technology to ensure the
              originality of your work.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Lightning Fast
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get results in seconds, not minutes. Our AI-powered system
                  processes your documents with incredible speed.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Detailed Reports
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Receive comprehensive reports highlighting potential
                  plagiarism and suggesting improvements.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Secure & Private
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Your documents are encrypted and never stored. We prioritize
                  your privacy and data security.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
