// import { useEffect, useRef } from 'react';

// const OverlayComponent = () => {
//   const overlayRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Iegūstam .overlay elementu
//     const overlay = overlayRef.current;

//     // Pārbaudam, vai elements ir definēts un nav "null"
//     if (overlay) {
//       // Atjaunojam augstumu, lai tas pielāgotos saturam
//       overlay.style.height = `${overlay.scrollHeight}px`;
//     }
//   }, []); // Šis efekts izpildīsies tikai vienreiz, kad komponente tiek ielādēta

//   return (
//     <div ref={overlayRef} className="overlay">
//       {/* Ievietojiet saturu šeit */}
//     </div>
//   );
// }

// export default OverlayComponent;
