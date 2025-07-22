//routes.ts
import { Router } from 'express';
import { createUserControllerInstance } from './controllers/user/create-user.js';
import { userLoginControllerInstance } from './controllers/user/user-login.js';
import { upload } from './config/multer.js';
import { createAnimalControllerInstance } from './controllers/animal/create-animal.js';
import { userAuthMiddlewareInstance } from './middlewares/user-auth.js';
import { getAvailableAnimalsControllerInstance } from './controllers/animal/get-available.js';
import { getUserAnimalsControllerInstance } from './controllers/animal/get-user-animals.js';
import { updateUserControllerInstance } from './controllers/user/update-user.js';
import { updateAnimalStatusControllerInstance } from './controllers/animal/update-animal-status.js';
import { createUserChatMessageControllerInstance } from './controllers/chat/create-user-chat-message.js';
import { getUserChatsControllerInstance } from './controllers/chat/get-user-chats.js';
import { getUserChatControllerInstance } from './controllers/chat/get-user-chat.js';
import { createUserChatControllerInstance } from './controllers/chat/create-user-chat.js';

const router = Router();

router.post(
  '/users',
  createUserControllerInstance.handle.bind(createUserControllerInstance)
);

router.patch(
  '/users',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateUserControllerInstance.handle.bind(updateUserControllerInstance)
);

router.post(
  '/users/chats/messages',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  createUserChatMessageControllerInstance.handle.bind(
    createUserChatMessageControllerInstance
  )
);

router.post(
  '/users/chats',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  createUserChatControllerInstance.handle.bind(createUserChatControllerInstance)
);

router.get(
  '/users/chats',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserChatsControllerInstance.handle.bind(getUserChatsControllerInstance)
);

router.get(
  '/users/chats/:chatId',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserChatControllerInstance.handle.bind(getUserChatControllerInstance)
);

router.post(
  '/login',
  userLoginControllerInstance.handle.bind(userLoginControllerInstance)
);

router.post(
  '/animals',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  upload.array('pictures', 5), // Middleware do multer para upload de até 5 arquivos
  createAnimalControllerInstance.handle.bind(createAnimalControllerInstance)
);

router.patch(
  '/animals/:id',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateAnimalStatusControllerInstance.handle.bind(
    updateAnimalStatusControllerInstance
  )
);

router.get(
  '/animals/available',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getAvailableAnimalsControllerInstance.handle.bind(
    getAvailableAnimalsControllerInstance
  )
);

router.get(
  '/animals/user',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserAnimalsControllerInstance.handle.bind(getUserAnimalsControllerInstance)
);

export { router };








// import { Router } from 'express';
// import { createUserControllerInstance } from './controllers/user/create-user.js';
// import { userLoginControllerInstance } from './controllers/user/user-login.js';
// import { upload } from './config/multer.js';
// import { createAnimalControllerInstance } from './controllers/animal/create-animal.js';
// import { userAuthMiddlewareInstance } from './middlewares/user-auth.js';
// import { getAvailableAnimalsControllerInstance } from './controllers/animal/get-available.js';
// import { getUserAnimalsControllerInstance } from './controllers/animal/get-user-animals.js';
// import { updateUserControllerInstance } from './controllers/user/update-user.js';
// import { updateAnimalStatusControllerInstance } from './controllers/animal/update-animal-status.js';
// import { createUserChatMessageControllerInstance } from './controllers/chat/create-user-chat-message.js';
// import { getUserChatsControllerInstance } from './controllers/chat/get-user-chats.js';
// import { getUserChatControllerInstance } from './controllers/chat/get-user-chat.js';
// import { createUserChatControllerInstance } from './controllers/chat/create-user-chat.js';

// const router = Router();

// // =====================
// // Public Routes (no authentication required)
// // =====================
// router.post(
//   '/users/register',
//   createUserControllerInstance.handle.bind(createUserControllerInstance)
// );

// router.post(
//   '/users/login',
//   userLoginControllerInstance.handle.bind(userLoginControllerInstance)
// );

// // =====================
// // Authenticated Routes (all routes below this will require authentication)
// // =====================
// router.use(
//   userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance)
// );

// // =====================
// // User Routes
// // =====================
// router.patch(
//   '/users',
//   updateUserControllerInstance.handle.bind(updateUserControllerInstance)
// );

// // =====================
// // Animal Routes
// // =====================
// router.post(
//   '/animals',
//   upload.array('pictures', 5),
//   createAnimalControllerInstance.handle.bind(createAnimalControllerInstance)
// );

// router.patch(
//   '/animals/:id',
//   updateAnimalStatusControllerInstance.handle.bind(
//     updateAnimalStatusControllerInstance
//   )
// );

// router.get(
//   '/animals/available',
//   getAvailableAnimalsControllerInstance.handle.bind(
//     getAvailableAnimalsControllerInstance
//   )
// );

// router.get(
//   '/animals/user',
//   getUserAnimalsControllerInstance.handle.bind(getUserAnimalsControllerInstance)
// );

// // =====================
// // Chat Routes
// // =====================
// router.post(
//   '/chats/messages',
//   createUserChatMessageControllerInstance.handle.bind(
//     createUserChatMessageControllerInstance
//   )
// );

// router.post(
//   '/chats',
//   createUserChatControllerInstance.handle.bind(createUserChatControllerInstance)
// );

// router.get(
//   '/chats',
//   getUserChatsControllerInstance.handle.bind(getUserChatsControllerInstance)
// );

// router.get(
//   '/chats/:chatId',
//   getUserChatControllerInstance.handle.bind(getUserChatControllerInstance)
// );

// export { router };
