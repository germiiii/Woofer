export default function WalkerCard(props) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "900px",
    height: "150px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  };

  const hoverCardStyle = {
    // Estilos para el estado hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  };

  const nameStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const addressStyle = {
    fontSize: "1.2em",
    color: "#555",
  };

  const imageStyle = {
    height: "100px",
    width: "100px",
    borderRadius: "8px",
  };

  const textStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
  };

  return (
    <div style={cardStyle}>
      <img src={props.image} style={imageStyle} />
      <div style={textStyle}>
        <h2 style={nameStyle}>{props.name + " " + props.lastName}</h2>
        <h4 style={addressStyle}>{props.address}</h4>
      </div>
    </div>
  );
}
