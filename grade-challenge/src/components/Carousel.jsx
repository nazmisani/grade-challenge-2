import carouselImage from "./assets/carousel.jpeg";

export default function Carousel() {
  return (
    <>
      <div className="relative w-full overflow-hidden mb-10">
        <img src={carouselImage} style={{ height: 500 }} className="w-full object-cover" />
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10 text-white">
          <h1 className="text-5xl font-bold" style={{ fontFamily: "Playfair Display" }}>
            Flavor of the World
          </h1>
          <p className="mt-2 text-lg">Taste the World on Your Plate.</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0" />
      </div>
    </>
  );
}
