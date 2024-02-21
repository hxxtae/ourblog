import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home';
import PostPage from '../pages/posts/detail';


function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/posts' element={<h1>Post List Page</h1>} />
      <Route path='/posts/:id' element={<PostPage />} />
      <Route path='/posts/new' element={<h1>Post New Page</h1>} />
      <Route path='/posts/edit/:id' element={<h1>Post Edit Page</h1>} />
      <Route path='/profile' element={<h1>Profile Page</h1>} />
      <Route path='*' element={<Navigate replace to={'/'} />} />
    </Routes>
  );
}

export default Router;
