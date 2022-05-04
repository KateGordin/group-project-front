export default function Playercomp(props) {
  //
  const artistId = props.artistId; // this is the code to get from URL

  return artistId ? (
    <iframe
      title="player"
      style={{ borderRadius: 4 }}
      src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
      width="300px"
      height="400px"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  ) : null;
}
