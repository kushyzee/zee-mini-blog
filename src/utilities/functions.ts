export const getExcerpt = (content: string, type: string, length: number) => {
  let newContent = "";

  if (content.length > length) {
    newContent = content.slice(0, length);

    if (type === "body") {
      return newContent + "...";
    } else if (type === "title") {
      return newContent;
    }
  }

  return content;
};

// Validation handler function
export const validationHandler = (
  value: string,
  type: "Title" | "Content",
  length: number
) => {
  if (!value.trim()) {
    return `${type} is required`;
  }
  if (value.trim().length < length) {
    return `${type} must be at least ${length} characters long`;
  }

  return null;
};

export const formatDate = (date: number) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  console.log(formattedDate);

  return formattedDate;
};

export const handleEditButtonPress = () => {};
