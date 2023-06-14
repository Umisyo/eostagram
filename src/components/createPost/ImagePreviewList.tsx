import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ImageMiniPreview from "~/components/createPost/ImageMiniPreview";

interface ImagePreviewListProps {
  files: FileList | null | undefined;
}

export default function ImagePreviewList({files}: ImagePreviewListProps) {
  if (files) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center h-fit">
        {[...files].map((file, index) => {
          return (
            <ImageMiniPreview file={file} key={index} />
          )
        })}
        <div className="flex items-center justify-center w-36 h-24 border border-dotted border-black">
          <FontAwesomeIcon icon={faPlus}/>
        </div>
      </div>
    )
  }
}