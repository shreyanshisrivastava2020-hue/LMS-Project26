export default function ProgressBar({ progress }: any) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded mt-4">
      <div
        className="bg-green-500 h-4 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}