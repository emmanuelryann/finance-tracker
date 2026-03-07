import '../styles/Overlay.css';

function Overlay({ isVisible, onClick }) {
  return (
    <div
      className={`overlay ${isVisible ? 'overlay--visible' : ''}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

export default Overlay;
