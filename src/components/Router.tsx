import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home';
import PostPage from '../pages/posts/detail';
import ProfilePage from '../pages/profile';
import NewPage from '../pages/posts/new';
import EditPage from '../pages/posts/edit';
import PostsPage from '../pages/posts';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/posts' element={<PostsPage />} />
      <Route path='/posts/:id' element={<PostPage />} />
      <Route path='/posts/new' element={<NewPage />} />
      <Route path='/posts/edit/:id' element={<EditPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='*' element={<Navigate replace to={'/'} />} />
    </Routes>
  );
}

export default Router;
