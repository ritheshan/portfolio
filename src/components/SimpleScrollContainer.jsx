const SimpleScrollContainer = ({ children }) => {
  return (
    <div
      className="w-full h-screen overflow-y-auto bg-white"
      style={{ position: 'relative' }}
    >
      {children}
    </div>
  );
};

export default SimpleScrollContainer;
