export enum RabbitMQ {
  UserQueue = 'users',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
  FIND_BY_EMAIL = 'FIND_BY_EMAIL',
  VALID_USERR = 'VALID_USERR',
  FIND_BY_PW = 'FIND_BY_PW',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
  SEND_CODE = 'SEND_CODE',
  ADD_PER_VALIDATE = 'ADD_PER_VALIDATE',
  REMOVE_PER_VALIDATE = 'REMOVE_PER_VALIDATE',
  ASIGN_ROLE = 'ASIGN_ROLE',
  DELETE_USER = 'DELETE_USER',
  SEND_ACCEPTED_MAIL = 'SEND_ACCEPTED_MAIL',
  CHECK_MAIL = 'CHECK_MAIL',
  EXCEPT_ME = 'EXCEPT_ME',
  VALID_PASSWORD = 'VALID_PASSWORD',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
}

export enum Permission {
  Read = 'read',
  Write = 'write',
}