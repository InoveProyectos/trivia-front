import { intSimpleButton } from "../../interfaces";

function SimpleButton({ onClick, ...props }: intSimpleButton) {
  const styles = {
    borderRadius: "4px",
    height: "48px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    outline: "none",
  };

  return <button onClick={onClick} style={styles} {...props}></button>;
}

export default SimpleButton;
