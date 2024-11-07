import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    return (
        <AppBar position="static" className="mb-4" style={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className="mr-2">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="flex-grow" style={{ color: '#fff' }}>
                    SciAstra
                </Typography>
                <Button color="inherit">
                    <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
                </Button>
                <Button color="inherit">
                    <Link href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>admin</Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
}