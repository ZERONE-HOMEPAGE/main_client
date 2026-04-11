export default function NetworkingForumPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 md:justify-start">
      <p className="mb-8 text-center text-3xl font-bold">네트워킹 포럼</p>
      <div className="w-full max-w-4xl flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
        <iframe
          src="https://luma.com/embed/calendar/cal-oCdzKGlGEfBixya/events"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
          allowFullScreen
          aria-hidden={false}
          tabIndex={0}
        />
      </div>
    </div>
  );
}
