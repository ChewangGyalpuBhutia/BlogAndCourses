"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blog')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <Container maxWidth="lg" className="mt-10">
        <Typography variant="h4" className="text-center mb-6" style={{ color: '#333' }}>
          Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {blogs.map(blog => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>
              <Card className="h-full">
                <Image
                  src={`http://localhost:8000/${blog.image_path}`}
                  alt={blog.title}
                  width={500}
                  height={300}
                  layout="responsive"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ color: '#1976d2' }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {blog.content}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" component="div" style={{ color: '#333' }}>
                      Publish Time: {new Date(blog.publish_time).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" className="text-center mt-10 mb-6" style={{ color: '#333' }}>
          Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.map(course => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card className="h-full">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ color: '#1976d2' }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {course.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="h6" component="div" style={{ color: '#333' }}>
                      Price: ${course.price}
                    </Typography>
                    <Typography variant="body2" component="div" style={{ color: '#ff0000' }}>
                      Discount: {course.discount}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}