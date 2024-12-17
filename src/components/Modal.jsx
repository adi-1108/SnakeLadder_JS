export function Modal({ currentPlayer, children, onClose }) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
          <button
            onClose={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
