export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">About Study Hub</h1>
          <p className="mt-4 text-lg text-gray-600">Education for All - Empowering Nepal through accessible, inclusive learning</p>
        </div>
        <div className="card space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="bi bi-heart-fill text-red-500"></i> Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Study Hub is a Nepal-focused educational platform built around the theme "Education for All". Our mission is to bridge the digital divide, promote inclusive education, and ensure equitable access to quality learning resources for every learner - regardless of location, gender, ability, language, or economic status.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              An inclusive, equitable, and quality education system that empowers all Nepali learners to reach their full potential, contributing to sustainable development across all seven provinces.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-nepal-50 rounded-lg border border-nepal-200">
                <h3 className="font-semibold text-gray-900">Inclusion</h3>
                <p className="text-sm text-gray-700 mt-1">Leaving no one behind - accessible for all abilities</p>
              </div>
              <div className="p-4 bg-nepal-50 rounded-lg border border-nepal-200">
                <h3 className="font-semibold text-gray-900">Equity</h3>
                <p className="text-sm text-gray-700 mt-1">Addressing barriers based on gender, location, and socioeconomics</p>
              </div>
              <div className="p-4 bg-nepal-50 rounded-lg border border-nepal-200">
                <h3 className="font-semibold text-gray-900">Localization</h3>
                <p className="text-sm text-gray-700 mt-1">Context-aware content for Nepal's diverse regions</p>
              </div>
              <div className="p-4 bg-nepal-50 rounded-lg border border-nepal-200">
                <h3 className="font-semibold text-gray-900">Sustainability</h3>
                <p className="text-sm text-gray-700 mt-1">Offline-first, low-bandwidth, community-driven solutions</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}