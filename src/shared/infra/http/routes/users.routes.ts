import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import CreateUserController from '@modules/accounts/userCases/createUser/CeateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';

const usersRoutes = Router();
const uploadAvatar = multer(upload.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthentication, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };
