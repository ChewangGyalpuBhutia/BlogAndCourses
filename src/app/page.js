
"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';
import Image from 'next/image';
import NavBar from './components/NavBar';
import { loadStripe } from '@stripe/stripe-js';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/blog')
      .then(response => {
        const currentDate = new Date();
        const filteredBlogs = response.data.filter(blog => new Date(blog.publish_time) < currentDate);
        setBlogs(filteredBlogs);
      })
      .catch(error => console.error(error));

    axios.get('http://127.0.0.1:8000/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  }, []);

  const makePayment = async (courseId) => {
    setLoading(true);
    const username = localStorage.getItem('username');
    const stripe = await loadStripe('pk_test_51Q13P7Jy2Tche9ruKBzUIqF3xpLM3M9M8Alx6uHlL6X9PMjlsCJwY1yG7AcVYY8JPEqwpCr4Zo4dkKnH1vDWcTo800qphPvA8Y');

    const response = await fetch('http://localhost:8000/create-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, courseId: courseId }),
    });

    const session = await response.json();

    if (session.id) {
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          toast.error(result.error.message);
        }
      } else {
        toast.error('Stripe is not initialized.');
      }
    } else {
      toast.error('Failed to create checkout session');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <NavBar />
      <Container maxWidth="lg" className="mt-10">
        <Typography variant="h4" className="text-center mb-6" style={{ color: '#333' }}>
          Blog Posts
        </Typography>
        <Grid container spacing={4} className='mt-5'>
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
          Browse and Subscribe to Courses
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
                  <Button variant="contained" color="primary" onClick={() => makePayment(course.id)} disabled={loading}>
                    {loading ? 'Processing...' : 'Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ClipLoader color="#00BFFF" loading={loading} size={80} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}