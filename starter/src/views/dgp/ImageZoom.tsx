import appConfig from "@/configs/app.config";
import { MouseEvent, TouchEvent, useEffect, useRef, useState, WheelEvent } from "react";

type Props = { src: string | null; alt?: string; open: boolean; onClose: () => void };

function Zoom({ src, alt = "Imagen", open, onClose }: Props) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [scale, setScale] = useState(1);        // 1 = tamaño original
  const [tx, setTx] = useState(0);              // translateX
  const [ty, setTy] = useState(0);              // translateY
  const [isPanning, setIsPanning] = useState(false);
  const startRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  if (!src) {
    return null;
  }

  // Pinch state
  const pinchRef = useRef<{
    dist: number;
    scale: number;
    cx: number;
    cy: number;
  } | null>(null);

  const MAX_SCALE = 8;
  const MIN_SCALE = 0.25;

  // Cerrar con ESC
  useEffect(() => {
    if (!open) { // false
      document.body.style.overflow = '';
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = 'hidden';
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset al abrir
  useEffect(() => {
    if (open) {
      fitToContainer();
    }
  }, [open]);

  // Util: aplica zoom centrado en un punto (cx, cy) relativo al contenedor
  const zoomAt = (factor: number, cx: number, cy: number) => {
    setScale(prev => {
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * factor));
      // Mantener el punto bajo el cursor estable:
      setTx(prevTx => cx - (cx - prevTx) * (newScale / prev));
      setTy(prevTy => cy - (cy - prevTy) * (newScale / prev));
      return newScale;
    });
  };

  // Wheel zoom
  const onWheel = (e: WheelEvent) => {
    // e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomAt(factor, cx, cy);
  };

  // Mouse pan
  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    startRef.current = { x: e.clientX, y: e.clientY, tx, ty };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isPanning || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    setTx(startRef.current.tx + dx);
    setTy(startRef.current.ty + dy);
  };

  const endPan = () => {
    setIsPanning(false);
    startRef.current = null;
  };

  // Touch: pinch & pan
  const distance = (t1: Touch, t2: Touch) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  const center = (t1: Touch, t2: Touch) => ({ cx: (t1.clientX + t2.clientX) / 2, cy: (t1.clientY + t2.clientY) / 2 });

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      startRef.current = { x: t.clientX, y: t.clientY, tx, ty };
    } else if (e.touches.length === 2) {
      const d = distance(e.touches[0], e.touches[1]);
      const { cx, cy } = center(e.touches[0], e.touches[1]);
      pinchRef.current = { dist: d, scale, cx, cy };
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && startRef.current && !pinchRef.current) {
      const t = e.touches[0];
      const dx = t.clientX - startRef.current.x;
      const dy = t.clientY - startRef.current.y;
      setTx(startRef.current.tx + dx);
      setTy(startRef.current.ty + dy);
    } else if (e.touches.length === 2 && pinchRef.current && containerRef.current) {
      e.preventDefault();
      const d = distance(e.touches[0], e.touches[1]);
      const rect = containerRef.current.getBoundingClientRect();
      const { cx, cy } = center(e.touches[0], e.touches[1]);
      const localCx = cx - rect.left;
      const localCy = cy - rect.top;
      const factor = d / pinchRef.current.dist;
      const targetScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchRef.current.scale * factor));

      setScale(prev => {
        // Mantener el centro del pinch estático
        setTx(prevTx => localCx - (localCx - prevTx) * (targetScale / prev));
        setTy(prevTy => localCy - (localCy - prevTy) * (targetScale / prev));
        return targetScale;
      });
    }
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
    startRef.current = null;
  };

  // Controles
  const zoomIn = () => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    zoomAt(1.15, r.width / 2, r.height / 2);
  };

  const zoomOut = () => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    zoomAt(1 / 1.15, r.width / 2, r.height / 2);
  };

  const reset100 = () => { setScale(1); setTx(0); setTy(0); };

  const fitToContainer = () => {
    if (!containerRef.current || !imgRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.naturalWidth;
    const ih = imgRef.current.naturalHeight;
    if (!iw || !ih) return;
    const s = Math.min(cw / iw, ch / ih);
    setScale(Math.max(MIN_SCALE, Math.min(MAX_SCALE, s)));
    setTx((cw - iw * s) / 2);
    setTy((ch - ih * s) / 2);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-[95vw] max-h-[95vh] w-full h-full bg-blur-xl rounded-lg shadow overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controles */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button onClick={zoomOut} className="px-2 py-1 bg-white/90 rounded shadow">−</button>
          <button onClick={zoomIn} className="px-2 py-1 bg-white/90 rounded shadow">+</button>
          <button onClick={reset100} className="px-2 py-1 bg-white/90 rounded shadow">100%</button>
          <button onClick={fitToContainer} className="px-2 py-1 bg-white/90 rounded shadow">Ajustar</button>
          <button onClick={onClose} className="px-2 py-1 bg-white/90 rounded shadow">Cerrar</button>
        </div>

        {/* Lienzo de interacción */}
        <div
          ref={containerRef}
          className="w-full h-full touch-pan-y touch-pinch-zoom cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endPan}
          onMouseLeave={endPan}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            draggable={false}
            className="select-none pointer-events-none"
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transformOrigin: "0 0",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ImageZoom({ src, alt = "Mapa" }: { src: string | null; alt?: string }) {
  const [open, setOpen] = useState(false);
  const imageUrl = `${appConfig.urlImagePrefixDGP}/${src}`;


  if (!src) {
    return null;
  }

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Preview que abre el modal */}
      <button
        onClick={() => setOpen(true)}
        className="w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-zoom-in"
        title="Ver imagen"
      >
        <img src={imageUrl} alt="Mapa" className="w-full h-full object-cover" />
      </button>
      
      <Zoom src={imageUrl} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
