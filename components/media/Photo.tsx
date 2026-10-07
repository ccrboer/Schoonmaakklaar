import Image from "next/image";
import type { ImageRef } from "@/types";

interface PhotoProps {
  image: ImageRef;
  /**
   * Beeldverhouding als Tailwind-klasse, bv. "aspect-[4/3]".
   * Responsief mag ook: "aspect-[4/3] lg:aspect-[3/2]".
   */
  ratio?: string;
  /** `sizes` voor next/image: bepaalt welke variant de browser ophaalt. */
  sizes: string;
  /** Alleen true voor het LCP-beeld boven de vouw. */
  priority?: boolean;
  /** Extra klassen op de wrapper (afronding, rand, schaduw). */
  className?: string;
}

/**
 * Foto met vaste verhouding, zodat er geen layout shift optreedt en de
 * bijsnijding voorspelbaar is. De uitsnede volgt `objectPosition` uit de
 * beeldconfig, zodat het onderwerp ook op mobiel in beeld blijft.
 *
 * Beelden zonder `priority` worden door next/image lui geladen.
 */
export function Photo({
  image,
  ratio = "aspect-[4/3]",
  sizes,
  priority = false,
  className = "",
}: PhotoProps) {
  return (
    <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={
          image.objectPosition
            ? { objectPosition: image.objectPosition }
            : undefined
        }
      />
    </div>
  );
}
