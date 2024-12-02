// UIComponents.js

// Basic Input Component
export const Input = ({ type, id, name, value, onChange, required }) => (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
    />
  );
  
  // Basic Button Component
  export const Button = ({ type, children, className }) => (
    <button
      type={type}
      className={`${className} py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none`}
    >
      {children}
    </button>
  );
  