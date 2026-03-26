export default function VideoPlayer({ videoUrl }: any) {
  return (
    <video controls className="w-full mt-4">
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}