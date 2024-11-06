'use client';

interface Props {
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export function QuantityField({ handleQuantityChange, quantity }: Props) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        disabled={quantity === 1}
        className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
        onClick={() => handleQuantityChange(quantity - 1)}
      >
        -
      </button>
      <span className="w-12 text-center">{quantity}</span>
      <button
        className="px-3 py-1 border rounded-md hover:bg-gray-100"
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}