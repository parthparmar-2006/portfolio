import Image from "next/image";
import { profile } from "@/data/profile";
import { imageSize, resolveAsset } from "@/lib/covers";

/**
 * The thing to look at, above the fold.
 *
 * An earlier version stacked three stat chips over the portrait — which
 * duplicated CGPA and LeetCode from the stats band 200px further down, and made
 * the hero tall enough to push the CTA off screen. The band is now the single
 * place proof lives, and this is just the portrait.
 *
 * It is the only `priority` image on the site: the LCP element on the home
 * page, so it must not wait for the lazy-load observer.
 */
export function HeroVisual() {
  // Real photo wins over the placeholder automatically — see resolveAsset.
  const portrait = resolveAsset("/media/about/portrait");
  if (!portrait) return null;
  // Measured, not assumed: a square photo must not reserve a 4:5 box.
  const size = imageSize(portrait) ?? { width: 1000, height: 1250 };

  return (
    <div className="relative">
      {/* Offset frame — a second rectangle behind the photo, so the card reads
          as printed rather than as a div with a border. */}
      <div
        aria-hidden
        className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-2xl border border-accent/40 sm:block"
      />

      <figure className="relative overflow-hidden rounded-2xl border border-rule bg-panel">
        <Image
          src={portrait}
          alt={`${profile.name}, photographed in ${profile.location}`}
          width={size.width}
          height={size.height}
          priority
          sizes="(min-width: 1024px) 400px, 70vw"
          // Capped height with a cover crop, so the portrait can never grow
          // taller than the text column beside it.
          className="max-h-[24rem] w-full object-cover object-top lg:max-h-[26rem]"
        />
      </figure>
    </div>
  );
}
