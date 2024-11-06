export function CheckoutFormGradients() {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute -left-[40%] -top-[60%] h-[500px] w-[500px] rounded-full bg-gradient-radial from-[#C9EBFF] via-[#F0F7FF] to-transparent opacity-20 blur-3xl" />
        <div className="absolute -right-[40%] -top-[60%] h-[500px] w-[500px] rounded-full bg-gradient-radial from-[#C9EBFF] via-[#F0F7FF] to-transparent opacity-20 blur-3xl" />
      </div>
    );
  }