import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styles?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ styles, children, disabled, type = "button", ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    `w-full rounded-full bg-green-400 border border-tranparent disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold transition`,
                    styles
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
