"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
import NavBar from '../components/NavBar';

export default function BlogManagement() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('publish_time', publishTime);
        formData.append('image', image);

        try {
            await axios.post('http://127.0.0.1:8000/api/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Blog post scheduled successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to schedule blog post');
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <NavBar />
            <Container maxWidth="sm" className="flex items-center justify-center">
                <Paper elevation={3} className="p-6">
                    <Typography variant="h4" className="text-black mb-4" style={{ color: '#333' }}>Blog Management</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Content"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                style={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Publish Time"
                                type="datetime-local"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={publishTime}
                                onChange={(e) => setPublishTime(e.target.value)}
                                required
                                style={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Box>
                        <Box mb={2}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                style={{ backgroundColor: '#1976d2', color: '#fff' }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                    required
                                />
                            </Button>
                        </Box>
                        {imagePreview && (
                            <Box mb={2} className="flex justify-center">
                                <img src={imagePreview} alt="Image Preview" className="max-w-full h-auto" />
                            </Box>
                        )}
                        <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: '#1976d2', color: '#fff' }}>
                            Schedule Blog Post
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}