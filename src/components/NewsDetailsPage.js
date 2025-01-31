import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify"; // Importing toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch blog details
  useEffect(() => {
    fetch(`https://safety-backend.vercel.app/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog details");
        setLoading(false);
      });
  }, [id]);

  // Fetch comments for the blog post
  useEffect(() => {
    const commentId = id;
    fetch(`https://safety-backend.vercel.app/api/comment/${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched comments data:", data.comments);
        setComments(data.comments || []);
      })
      .catch((err) => {
        console.error("Failed to load comments", err);
      });
  }, []);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!userId) {
      setOpenLoginModal(true);
      return;
    }
    if (!newComment.trim()) return;

    try {
      const response = await fetch(
        "https://safety-backend.vercel.app/api/comment/add-comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogPostId: id,
            userId: userId,
            commentText: newComment,
          }),
        }
      );

      const data = await response.json();
      console.log("Response from add comment API:", data);
      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, data.comment]);
        setNewComment("");
        toast.success("Comment added successfully!"); // Show success toast
      } else {
        toast.error("Failed to add comment: " + data.message); // Show error toast
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("An error occurred while adding your comment.");
    }
  };

  // Handle closing the login modal
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate("/login");
    handleCloseLoginModal();
  };

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading details...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ py: 5, px: "8%" }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <Paper sx={{ mb: 3 }}>
              <img
                src={
                  blogDetails.image.secure_url ||
                  "https://via.placeholder.com/800"
                }
                alt="Blog Image"
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Paper>

            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
              {blogDetails.title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Tags: {blogDetails.tags.join(", ")}
            </Typography>

            <Divider sx={{ mt: 4 }} />

            <Typography variant="body1" sx={{ mt: 2 }}>
              {blogDetails.content}
            </Typography>
          </Box>

          <Divider sx={{ mt: 4 }} />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Comments:
            </Typography>

            {/* Render comments */}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {comment.user.FirstName || "Anonymous"}{" "}
                    {comment.user?.LastName || ""}
                  </Typography>
                  <Typography variant="body2">
                    {comment.commentText || "No comment text available."}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Posted on {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}

            {/* Add new comment input */}
            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment"
              multiline
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              // color="primary"
              sx={{
                mt: 2,
                backgroundColor: "#81C784", // Apply your desired color here
                "&:hover": {
                  backgroundColor: "#66BB6A", // Hover color (you can adjust this as needed)
                },
              }}
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Login Modal */}
      <Dialog open={openLoginModal} onClose={handleCloseLoginModal}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You must be logged in to add a comment. Please log in to continue.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginRedirect} color="primary">
            Login
          </Button>
          <Button onClick={handleCloseLoginModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </Box>
  );
};

export default BlogDetailsPage;
