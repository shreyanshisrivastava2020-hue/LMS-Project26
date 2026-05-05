import { Readable } from "stream";
// Helper to convert buffer to stream
export default function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}
