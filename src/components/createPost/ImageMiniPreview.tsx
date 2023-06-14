import Image from "next/image";

interface ImageMiniPreviewProps {
  file: File;
}

export default function ImageMiniPreview ({file}: ImageMiniPreviewProps) {
  return (
    <button type="button" className="flex items-center w-36 h-24 relative">
      <Image className="object-cover" src={URL.createObjectURL(file)} alt="" fill/>
    </button>
  )
}