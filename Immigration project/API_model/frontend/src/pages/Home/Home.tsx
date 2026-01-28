export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-900">
        Welcome to Australian Immigration
      </h2>

      <p className="text-gray-600 mt-3">
        I'm an AI assistant specialized in immigration. Ask me anything about visa
        requirements, points, documents, or immigration processes.
      </p>

      <input
        className="mt-6 w-full border rounded-lg px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        placeholder="Type your message..."
      />
    </div>
  );
}