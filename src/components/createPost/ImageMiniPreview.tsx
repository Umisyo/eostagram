import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {Button} from "~/components/ui/button";
import {X} from "lucide-react";

interface ImageMiniPreviewProps {
  file: File;
  index: number;
  handleDeleteFile: (index: number) => void;
  setCurrentPreviewIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageMiniPreview({file, index, handleDeleteFile, setCurrentPreviewIndex}: ImageMiniPreviewProps) {
  return (
    <div className="w-fit h-fit relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button"
              className="absolute top-[-5px] right-[-5px] w-4 h-4 rounded-full p-0 z-10 bg-black opacity-80 hover:opacity-50"
              onClick={e => {
                e.preventDefault()
                handleDeleteFile(index)
              }}>
              <X className="h-2 w-2 text-white"/>
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>delete image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <button type="button" className="flex items-center w-36 h-24 relative z-0" onClick={e => {
        e.preventDefault()
        setCurrentPreviewIndex(index)
      }}>
        <Image className="object-cover" src={URL.createObjectURL(file)} alt="" fill/>
      </button>
    </div>
  )
}