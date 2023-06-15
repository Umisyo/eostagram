import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {Button} from "~/components/ui/button";
import {X} from "lucide-react";
import {Badge} from "~/components/ui/badge";

interface TagBadgeProps {
  tag: string;
  index: number;
  handleDeleteTag: (index: number) => void;
}

export default function TagBadge({tag, index, handleDeleteTag}: TagBadgeProps) {
  return (
    <Badge variant="outline" className="px-2 min-w-10 w-fit">
      <span className="flex items-center gap-2">
        {tag}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button"
                className="w-4 h-4 rounded-full p-0 bg-black opacity-80 hover:opacity-50"
                onClick={() => {
                  handleDeleteTag(index)
                }}>
                <X className="h-2 w-2 text-white"/>
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>delete tag</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </Badge>
  )
}