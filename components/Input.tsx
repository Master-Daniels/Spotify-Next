import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styles?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { id, styles, type, disabled, placeholder, ...props },
    ref
) {
    return (
        <input
            id={id}
            type={type}
            disabled={disabled}
            className={twMerge(
                `flex w-full rounded-md bg-neutral-700 border border-transparent p-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none ${styles}`
            )}
            ref={ref}
            placeholder={placeholder}
            {...props}
        />
    );
});

export default Input;
