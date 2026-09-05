// Approximate Chengguan Campus location, rounded to two decimal places.
// Campus POI: https://ditu.amap.com/place/B03A30A8AT (36.046674, 103.859546).
// These coordinates identify the university, never a background photograph.
export function CampusLocation() {
  return (
    <div
      className="campus-location"
      title="Approximate location of Lanzhou University, Chengguan Campus; not the photograph location"
    >
      <span>103.86° E · 36.05° N</span>
      <span>/ Lanzhou University</span>
    </div>
  );
}
