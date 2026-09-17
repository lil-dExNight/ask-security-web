// Prefixes a public-asset path with the deployment base path.
// Needed because next/image does not apply basePath to src in static export.
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
