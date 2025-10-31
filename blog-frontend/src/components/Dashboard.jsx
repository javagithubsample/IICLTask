import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";

export default function Dashboard() {
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

  
  const totalBlogs = blogs.length;
  const authors = blogs.map((b) => b.author);
  const topAuthor =
    authors.length > 0
      ? Object.entries(
          authors.reduce((acc, a) => {
            acc[a] = (acc[a] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0][0]
      : "N/A";

  const recentBlogs = blogs.slice(-5).reverse(); 

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976d2",
          mb: 4,
        }}
      >
        📊 Blog Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Blogs */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                <ArticleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Total Blogs
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {totalBlogs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Author */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#388e3c" }}
              >
                <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Top Author
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {topAuthor}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Last Updated */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#f57c00" }}
              >
                <UpdateIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Recently Added
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {recentBlogs.length > 0
                  ? recentBlogs[0].title
                  : "No recent blogs"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Blogs List */}
      <Card sx={{ mt: 5, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
          >
            🕒 Recent Blogs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {recentBlogs.length === 0 ? (
              <Typography color="text.secondary">No blogs yet.</Typography>
            ) : (
              recentBlogs.map((blog) => (
                <ListItem key={blog.id} disablePadding>
                  <ListItemText
                    primary={blog.title}
                    secondary={`by ${blog.author}`}
                  />
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
