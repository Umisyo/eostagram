import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Label} from '~/components/ui/label'
import {useEffect, useMemo, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ImagePreviewList from "~/components/createPost/ImagePreviewList";
import {WithContext as ReactTags} from 'react-tag-input';
import {Badge} from "~/components/ui/badge";
import {useToast} from "~/components/ui/use-toast";


export default function Form() {
  const [files, setFiles] = useState<FileList | null>()
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0)
  const [tags, setTags] = useState<{ id: string, text: string }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const {toast} = useToast()

  const selectedFileArray: File[] = useMemo(() => {
    return files ? [...Array.from(files)] : [];
  }, [files]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!inputRef.current?.files) return;
    if(files?.length && files.length >= 8) {
      toast({
        title: '画像は8枚までです',
      })
      return
    }

    const newFileArray = [
      ...selectedFileArray,
      ...Array.from(e.target.files),
    ].filter(
      (file, index, self) =>
        self.findIndex((f) => f.name === file.name) === index // 重複を削除
    );
    const dt = new DataTransfer();
    newFileArray.forEach((file) => dt.items.add(file));
    inputRef.current.files = dt.files; // input内のFileListを更新
    setFiles(dt.files); // Reactのstateを更新
  };

  const handleDeleteFile = (index: number) => {
    if (!inputRef.current?.files) return;
    const dt = new DataTransfer();
    selectedFileArray.forEach((file, i) => i !== index && dt.items.add(file));
    inputRef.current.files = dt.files;
    setFiles(dt.files);
  };

  useEffect(() => {
    if (!files) return;
    if (currentPreviewIndex >= files.length) {
      setCurrentPreviewIndex(files.length - 1);
    }
  }, [files, currentPreviewIndex]);

  const isExistTag = (text: string) => {
    if (tags.length === 0) return false;
    return tags.some(tag => tag.text === text);
  }

  const handleDeleteTag = (tagIndex: number) => {
    setTags(tags.filter((tag, index) => index !== tagIndex));
  };

  const handleAdditionTag = (tag: { id: string, text: string }) => {
    isExistTag(tag.text) ? toast({title: 'すでにタグが存在します'}) : setTags([...tags, tag]);
  };


  return (
    <div className="max-w-7xl px-4 pb-12">
      <p className="text-center py-2 border-b border-gray-400">投稿を作成</p>
      <form className="grid md:grid-cols-2 pt-2">
        <div className="w-full md:h-[500px]">
          <label className="grid gap-4">
            <div>
              {files && files.length > 0 ?
                <div className="max-w-[600px] h-[400px] relative">
                  <Image className="mx-auto md:object-cover object-contain"
                    src={URL.createObjectURL(files[currentPreviewIndex] || files[0])} alt=""
                    fill/>
                </div>
                :
                <div
                  className="flex justify-center items-center border border-dotted border-gray-600 md:w-[600px] h-[500px]">
                  <FontAwesomeIcon className="w-[72px] h-auto" icon={faImages}/>
                </div>
              }
              <input className="hidden" type="file" name="image" accept="image/*" ref={inputRef}
                onChange={handleChangeFile} required multiple/>
            </div>
            <ImagePreviewList files={files} handleDeleteFile={handleDeleteFile}
              setCurrentPreviewIndex={setCurrentPreviewIndex}/>
          </label>
        </div>
        <div className="flex flex-col gap-2 md:justify-center w-full">
          <div>
            <Label className="flex items-center">
              タイトル
              <Badge variant="default" className="ml-2 bg-red-500">必須</Badge>
            </Label>
            <Input className="mt-2" type="text" name="title" placeholder="アーモロートにて" required/>
          </div>
          <div>
            <Label>説明</Label>
            <Textarea className="mt-2" name="caption" placeholder="アーモロートの街角で撮影した一枚です"/>
          </div>
          <div>
            <Label>タグ</Label>
            <ReactTags
              classNames={{tagInput: "mt-2", tagInputField: "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}}
              maxLength={10}
              handleAddition={handleAdditionTag}
              handleDelete={handleDeleteTag} placeholder="タグを入力してください"/>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag ) => {
                return (
                  <Badge key={tag.id} variant="outline" className="min-w-10 w-fit">{tag.text}</Badge>
                )
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}