export default function TailwindCSSDemo() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tailwind CSS Demo</h2>
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
        <p>Card dùng Tailwind CSS.</p>
        <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Nhấn
        </button>
      </div>
    </div>
  );
}