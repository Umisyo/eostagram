import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ImageMiniPreview from "~/components/createPost/ImageMiniPreview";

interface ImagePreviewListProps {
  files: FileList | null | undefined;
  handleDelete: (index: number) => void;
  setCurrentPreviewIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImagePreviewList({files, handleDelete, setCurrentPreviewIndex}: ImagePreviewListProps) {
  if (files && files.length > 0) {
    return (
      <div className="flex overflow-x-scroll gap-2 py-2 items-center h-fit shrink-0">
        {[...files].map((file, index) => {
          return (
            <ImageMiniPreview file={file} key={index} index={index} handleDelete={handleDelete}
              setCurrentPreviewIndex={setCurrentPreviewIndex}/>
          )
        })}
        {files.length < 4 &&
          <div className="flex items-center justify-center w-36 h-24 border border-dotted border-black shrink-0">
            <FontAwesomeIcon icon={faPlus}/>
          </div>
        }
      </div>
    )
  }
}