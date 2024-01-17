const blogModel = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs.");
  const response = await blogModel.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : " Cannot create new blog .",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs.");
  const response = await blogModel.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : " Cannot update blog.",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await blogModel.find();
  return res.json({
    success: response ? true : false,
    getBlog: response ? response : " Cannot get blogs.",
  });
});
/*
khi nguoi dung like 1 bai blog thi:
1. check xem nguoi dung do truoc do co dislike hay khong => bo dislike
2. check xem nguoi do co like hay khong => bo like hoac them like
*/
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs.");
  const blog = await blogModel.findById(bid);
  const alreadyDisliked = blog?.dislikes?.find((e) => e.toString() === _id);
  if (alreadyDisliked) {
    await blogModel.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isliked = blog?.likes?.find((e) => e.toString() === _id);
  if (isliked) {
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs.");
  const blog = await blogModel.findById(bid);
  const alreadyliked = blog?.likes?.find((e) => e.toString() === _id);
  if (alreadyliked) {
    await blogModel.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isDisliked = blog?.dislikes?.find((e) => e.toString() === _id);
  if (isDisliked) {
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await blogModel.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const getOneBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await blogModel
    .findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate("likes", "firstname lastname")
    .populate("dislikes", "firstname lastname");
  return res.json({
    success: blog ? true : false,
    getOneBlog: blog ? blog : " Cannot get blogs.",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await blogModel.findByIdAndDelete(bid);
  return res.json({
    success: blog ? true : false,
    deleteBlog: blog ? blog : " Something went wrong. ",
  });
});

const uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  console.log(req.file);
  if (!req.file) throw new Error("Missing inputs.");
  const response = await blogModel.findByIdAndUpdate(
    bid,
    {
      image: req.file.path,
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updateBlog: response ? response : "Cannot upload images blog.",
  });
});

module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getOneBlog,
  deleteBlog,
  uploadImagesBlog,
};
