export default function Stripes() {
  return (
    <div className="mt-20 pb-40 lg:pb-64 bg-inverse" aria-hidden="true">
      <div style={{ marginTop: "-23px" }}>
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            className="bg-primary"
            style={{ marginTop: `${index}px`, height: `${23 - index}px` }}
          />
        ))}
      </div>
    </div>
  );
}
