import Image from 'next/image';

export function Sun() {
  return (
    <Image
      src="/images/sun.png"
      alt="Sun"
      width={160}
      height={160}
      className="rounded-full drop-shadow-2xl"
    />
  );
}
