import { redirect } from 'next/navigation';

// The Erasure Studio has been replaced by the Poetry Games play room.
export default function ErasureRedirect() {
  redirect('/poetry/games');
}
