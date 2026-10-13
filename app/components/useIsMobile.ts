import { useSyncExternalStore } from "react";

// Phones: below Tailwind's `sm` breakpoint (40rem), the same line the `max-sm:` classes use. There
// the home page drops the moon pull and shows About me as a section above Contact instead.
export const MOBILE_QUERY = "(max-width: 39.99rem)";

export const isMobile = () => matchMedia(MOBILE_QUERY).matches;

const subscribe = (onChange: () => void) => {
  const query = matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// False on the server; components that differ on phones also hide with `max-sm:` classes, so the
// first paint is right before this catches up.
export default function useIsMobile() {
  return useSyncExternalStore(subscribe, isMobile, () => false);
}
