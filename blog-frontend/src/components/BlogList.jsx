import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../services/blogService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await deleteBlog(id);
      toast.success("Blog deleted!");
      loadBlogs();
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "#1976d2" }}
      >
        📝 All Blogs
      </Typography>

      {blogs.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          No blogs found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                  Author
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  hover
                  sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
                >
                  <TableCell sx={{ padding: "16px 24px" }}>
                    {blog.title}
                  </TableCell>
                  <TableCell sx={{ padding: "16px 24px" }}>
                    {blog.author}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                      sx={{ mt: 1, mb: 1 }}
                    >
                      <Button
                        component={Link}
                        to={`/view/${blog.id}`}
                        variant="outlined"
                        startIcon={<Visibility />}
                        color="primary"
                      >
                        View
                      </Button>
                      <Button
                        component={Link}
                        to={`/edit/${blog.id}`}
                        variant="outlined"
                        startIcon={<Edit />}
                        color="success"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog.id)}
                        variant="outlined"
                        startIcon={<Delete />}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
