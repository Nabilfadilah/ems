import { forwardRef } from "react";
import Label from "./Label";
import Input from "./Input";

const InputForm = forwardRef((props, ref) => {
  const { label, name, type, placeholder, className, onChange } = props; // Ambil className dari props

  return (
    <div className="mb-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={className} // Gunakan className yang diterima dari props
        onChange={onChange}
        required
      />
    </div>
  );
});

export default InputForm;