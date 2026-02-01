'use client';

interface LocationMapProps {
  embedUrl?: string;
}

export default function LocationMap({ embedUrl }: LocationMapProps) {
  const defaultEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.8!2d72.5!3d23.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAzJzM2LjAiTiA3MsKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890";

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
            <span className="text-green-800 text-sm font-semibold tracking-wider">LOCATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-800 to-green-900 bg-clip-text text-transparent mb-4">
            Find Us Here
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Visit our office for in-person consultations and business inquiries
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-green-100/50 bg-white">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 z-10"></div>

          {/* Google Map Embed */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <iframe
              src={embedUrl || defaultEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
