import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

type FeatureCardProps = {
  imgSrc?: string                // 👉 si pasas solo la ruta de la imagen
  img?: React.ReactNode          // 👉 si pasas un ícono o componente ya renderizado
  title: string | null
  children: React.ReactNode
  cta?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imgSrc,
  img,
  title,
  children,
  cta = 'Explorar',
}) => (
  <div className="flex h-full flex-col items-center justify-between rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-100 transition hover:bg-[#32C3D21F]">
    <div className="mb-6 grid h-28 w-28 place-items-center rounded-full bg-[#EAF7F9] text-[#0097A7]">
      {img ? (
        img
      ) : imgSrc ? (
        <img src={imgSrc} alt={title ?? ''} className="h-14 w-14 object-contain" />
      ) : null}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-[#004748]">{title}</h3>
    <p className="mb-6 max-w-xs text-xs text-slate-500">{children}</p>
    <a
      href="#"
      className="inline-flex items-center gap-2 rounded-full border border-[#0097A7] px-4 py-2 text-sm font-medium text-[#0097A7] hover:bg-[#0097A7] hover:text-white"
    >
      {cta}
      <BiChevronRight className="h-4 w-4" />
    </a>
  </div>
)

export default FeatureCard
