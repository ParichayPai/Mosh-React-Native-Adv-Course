import client from "./client";

const endpoint = "./listings";

const getListings = () => client.get(endpoint);

const addListing = (post, onUploadProgress) => {
  const data = new FormData();
  data.append("title", post.title);
  data.append("price", post.price);
  data.append("categoryId", post.category.value);
  data.append("description", post.description);

  post.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (post.location) {
    data.append("location", JSON.stringify(post.location));
  }
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getListings,
  addListing,
};
