const Gallery = ({ images }) => {
  return (
    <div className="image-container">
      {images && images.length > 0 ? (
        images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Screenshot ${idx + 1}`}
            className="gallery-screenshot"
            style={{ width: "200px", margin: "10px" }}
          />
        ))
      ) : (
        <h3>You haven't made a screenshot yet!</h3>
      )}
    </div>
  );
};

export default Gallery;