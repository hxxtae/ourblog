import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/home';
import PostDetailPage from '../pages/posts/detail';
import ProfilePage from '../pages/profile';
import PostNew from '../pages/posts/new';
import PostEdit from '../pages/posts/edit';
import PostsPage from '../pages/posts';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/posts' element={<PostsPage />} />
      <Route path='/posts/:id' element={<PostDetailPage />} />
      <Route path='/posts/new' element={<PostNew />} />
      <Route path='/posts/edit/:id' element={<PostEdit />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='*' element={<Navigate replace to={'/'} />} />
    </Routes>
  );
}

export default Router;
