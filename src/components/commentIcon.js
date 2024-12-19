import { memo } from "react";
import { FaRegComment } from "react-icons/fa";

function CommentIcon({ marginLeft, setOpenComments, openComments }) {
  return (
    <FaRegComment
      style={{
        color: openComments ? "black" : "grey",
        cursor: "pointer",
        marginLeft: `${marginLeft}px`,
      }}
      onClick={() => setOpenComments(!openComments)}
      size={25}
      className="bg-gray-200 rounded-full  hover:bg-gray-300"
      // onClick={handleLike}
    />
  );
}

export default memo(CommentIcon);
