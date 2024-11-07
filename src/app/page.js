import Link from 'next/link';
// import styles from '../styles/NavBar.module.css';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/admin/">Home</Link>
        </li>
        <li>
          <Link href="/courses/">Courses</Link>
        </li>
        <li>
          <Link href="/Banner/">Blog Management</Link>
        </li>
      </ul>
    </nav>
  );
}