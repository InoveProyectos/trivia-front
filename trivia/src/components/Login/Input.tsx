import { intInput } from "../../interfaces";

function Input({ value, onChange, ...props }: intInput) {
  const styles = {
    borderRadius: "4px",
    height: "48px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "0.5rem 1rem",
  };

  return <input value={value} onChange={onChange} style={styles} {...props} />;
}

export default Input;
