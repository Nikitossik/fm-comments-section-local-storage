export const commentInit = (initialValue) =>
  JSON.parse(localStorage.getItem("data")) || initialValue;

export const commentReducer = (draft, action) => {
  switch (action.type) {
    case "add_comment":
      draft.comments.push({
        id: Date.now(),
        content: action.content,
        user: draft.currentUser,
        createdAt: "now",
        score: 0,
        replies: [],
      });
      break;
    case "add_reply":
      const replyComment = draft.comments.find(
        (comment) => comment.id === action.replyCommentId
      );
      replyComment.replies.push({
        id: Date.now(),
        content: action.content,
        user: draft.currentUser,
        replyingTo: action.replyingTo,
        createdAt: "now",
        score: 0,
      });
      break;
    case "update_comment": {
      const allComments = draft.comments.flatMap((comment) => [
        comment,
        ...comment.replies,
      ]);
      let currentComment = allComments.find(
        (comment) => comment.id == action.id
      );
      Object.assign(currentComment, action.changes);

      break;
    }
    case "delete_comment":
      const filtered = draft.comments.filter(
        (comment) => comment.id !== action.id
      );
      if (filtered.length != draft.comments.length) draft.comments = filtered;
      else
        draft.comments = draft.comments.map((comment) => {
          if (comment.replies.find((c) => c.id === action.id)) {
            comment.replies = comment.replies.filter((c) => c.id != action.id);
            return comment;
          }
          return comment;
        });

    default:
      return draft;
  }
};
