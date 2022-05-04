export default function Playercomp(props) {
  const spotiUrl = props.spotifyUrl; // this is the code to get from URL

  return spotiUrl ? (
    <iframe
      title="player"
      style={{ borderRadius: 4 }}
      src={`https://open.spotify.com/embed/artist/${spotiUrl}?utm_source=generator&theme=0`}
      width="300px"
      height="400px"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  ) : null;
}
